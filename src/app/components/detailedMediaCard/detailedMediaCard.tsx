"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io"; //Iconics 4
import { IShow } from "../../interfaces";
import { EditPopup } from "./components/editPopup";
import { Tags } from "./components/tags";
import { WatchOnButton } from "./components/watchbtn";
import { InfoCard } from "./components/infoCard";
import { useAppConfigContext } from "../../utils/appConfigContext";
import Image from "next/image";

export function DetailedMediaCard() {
  const router = useRouter();
  const appConfig = useAppConfigContext();
  const stream_name = useSearchParams().get("stream_name") || "";

  const [media, setMedia] = useState<IShow>({} as IShow);
  const [backButtonHover, setBackButtonHover] = useState(false);

  const [editPopup, setEditPopup] = useState(false);

  const fetchMediaData = async () => {
    const response = await fetch(
      `${appConfig.backend_url}/detailed-media?stream_name=${stream_name}`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  return (
    <div className="flex flex-col">
      {editPopup ? (
        <EditPopup selectedmedia={media} closePopup={handleEditClose} />
      ) : null}
      <div
        id="backdrop"
        className={`w-full bg-cover bg-center bg-gray-900/25 rounded-t-md`}
        style={
          media.backdrop ? { backgroundImage: `url(${media.backdrop})` } : {}
        }
      >
        <div className="grid grid-cols-6 grid-rows-4 h-full p-4 bg-gray-900/25 rounded-t-md">
          {media.poster ? (
            <div className="flex justify-start col-span-2 row-span-4">
              <Image
                src={media.poster}
                alt=""
                width={440}
                height={660}
                className="rounded-xl"
              />
            </div>
          ) : (
            <div className="flex justify-center col-span-1 row-span-4 bg-gray-900/50" />
          )}
          <div className="flex items-start justify-end gap-4 m-4 col-span-4">
            <span
              className="h-10 w-10 cursor-pointer rounded-full"
              onMouseEnter={() => setBackButtonHover(true)}
              onMouseLeave={() => setBackButtonHover(false)}
            >
              {backButtonHover ? (
                <IoIosCloseCircle className="h-10 w-10" onClick={handleBack} />
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
                  stream_name={stream_name}
                  mediaType={media.type}
                />
              </div>
            </div>
            <div className="flex flex-col items-end justify-end gap-4 mr-4">
              <button className="customButton">Add to Watchlist</button>

              <div className="flex gap-4">
                <button className="customButton" onClick={handleEdit}>
                  Edit Media
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="body" className="flex w-full h-fit my-12 gap-4">
        <div className="w-4/6 min-h-full">
          <h1 className="text-2xl pb-1 font-semibold">Description</h1>
          <p className="pr-8">{media.overview}</p>
          <h1 className="text-2xl font-semibold pb-1 mt-12">Seasons</h1>
          <div className="flex flex-col gap-4"></div>
        </div>
        <div className="-translate-y-8 w-3/6 h-fit">
          <InfoCard media={media} />
        </div>
      </div>
    </div>
  );
}
