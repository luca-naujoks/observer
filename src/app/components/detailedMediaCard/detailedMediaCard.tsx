"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io"; //Iconics 4
import { IShow } from "../../interfaces";
import { EditPopup } from "./components/editPopup";
import { Tags } from "./components/tags";
import { WatchOnButton } from "./components/watchbtn";
import { InfoCard } from "./components/infoCard";
import { SeasonContainer } from "./components/seasonContainer";
import { useAppConfigContext } from "../../utils/appConfigContext";

export function DetailedMediaCard() {
  const router = useRouter();
  const appConfig = useAppConfigContext();
  const streamName = useSearchParams().get("streamName") || "";

  const [media, setMedia] = useState<IShow>({} as IShow);
  const [backButtonHover, setBackButtonHover] = useState(false);

  const [editPopup, setEditPopup] = useState(false);

  const fetchMediaData = async () => {
    const response = await fetch(
      `${appConfig.backend_url}/detailed-media?streamName=${streamName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: IShow = await response.json();
    setMedia(data);
  };

  useEffect(() => {
    fetchMediaData();
  }, []);

  const handleRequest = async () => {
    const response = await fetch(
      `${appConfig.backend_url}/rabbit?streamName=${media.streamName}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.status === 200) {
      setMedia({ ...media, state: "requested" });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    setEditPopup(true);
  };

  const handleEditClose = () => {
    setEditPopup(false);
    fetchMediaData();
  };

  const StateButton = (() => {
    switch (media.state) {
      case "requested":
        return <button className="customButton">Requested</button>;
      case "downloading":
        return <button className="customButton">Available</button>;
      case "partiallyAvailable":
        return <button className="customButton">Available</button>;
      case "available":
        return <button className="customButton">Available</button>;

      default:
        return (
          <button onClick={handleRequest} className="customButton">
            Request Download
          </button>
        );
    }
  })();

  return (
      <div className="flex flex-col w-full">
        {editPopup ? (
          <EditPopup selectedmedia={media} closePopup={handleEditClose} />
        ) : null}
        <div
          id="backdrop"
          className={`w-full h-1/2 bg-cover bg-center`}
          style={{ backgroundImage: `url(${media.backdrop})` }}
        >
          <div className="grid grid-cols-5 grid-rows-4 h-full p-4 bg-gray-900/50">
            <img
              src={media.poster}
              alt=""
              className="col-span-1 row-span-4 w-ful h-full rounded-xl"
            />
            <div className="flex items-start justify-end gap-4 m-4 col-span-4">
              <span
                className="h-10 w-10 cursor-pointer rounded-full"
                onMouseEnter={() => setBackButtonHover(true)}
                onMouseLeave={() => setBackButtonHover(false)}
              >
                {backButtonHover ? (
                  <IoIosCloseCircle
                    className="h-10 w-10"
                    onClick={handleBack}
                  />
                ) : (
                  <IoIosCloseCircleOutline
                    className="h-10 w-10"
                    onClick={handleBack}
                  />
                )}
              </span>
            </div>
            <span className="col-span-4" />
            <h1 className="flex items-end h-full col-span-4 pl-4 text-5xl font-bold">
              {media?.name}
            </h1>
            <div className="flex justify-between col-span-4 pl-4">
              <div className="flex flex-col justify-between h-full">
                <div className="mt-2">
                  <Tags tags={media.tags} />
                </div>
                <div className="">
                  <WatchOnButton
                    streamName={streamName}
                    mediaType={media.type}
                  />
                </div>
              </div>
              <span className="flex items-end gap-4 mr-4">
                <button className="customButton" onClick={handleEdit}>
                  Edit Media
                </button>
                {StateButton}
              </span>
            </div>
          </div>
        </div>
        <div id="body" className="flex w-full h-fit mb-12 p-4 gap-4">
          <div className="w-4/6 min-h-full">
            <h1 className="text-2xl pb-1 font-semibold">Description</h1>
            <p className="pr-32">{media.overview}</p>
            <h1 className="text-2xl font-semibold pb-1 mt-12">Seasons</h1>
            <div className="flex flex-col gap-4">
              {media.seasons?.map((season) => (
                <SeasonContainer
                  season={season}
                  localSeasons={
                    media?.localSeasons?.find(
                      (s) => s.season === season.season_number
                    )?.episodes || []
                  }
                  tmdbID={media.tmdbID}
                  key={season.id}
                />
              ))}
            </div>
          </div>
          <div className="w-2/6 h-fit px-12">
            <InfoCard media={media} />
          </div>
        </div>
      </div>
  );
}
