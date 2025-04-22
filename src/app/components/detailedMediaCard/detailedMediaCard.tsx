"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io"; //Iconics 4
import { IDetailedMedia } from "../../interfaces";
import { EditPopup } from "./components/editPopup";
import { InfoCard } from "./components/infoCard";
import { useAppConfigContext } from "../../utils/appConfigContext";
import Image from "next/image";
import { SeasonContainer } from "../ui/SeasonContainer";
import useSWR from "swr";

export function DetailedMediaCard() {
  const router = useRouter();
  const appConfig = useAppConfigContext();
  const stream_name = useSearchParams().get("stream_name") || "";

  const fetcher = async (url: string): Promise<IDetailedMedia> => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  };

  const { data: media, error } = useSWR<IDetailedMedia>(
    `${appConfig.backend_url}/detailed-media?stream_name=${stream_name}`,
    fetcher
  );
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
    const data: IDetailedMedia = await response.json();
    return data;
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

  if (error) return <p>Error loading media data</p>;
  if (!media) return <p>Loading...</p>;

  return (
    <div className="flex flex-col">
      {editPopup ? (
        <EditPopup selectedmedia={media} closePopup={handleEditClose} />
      ) : null}
      <div
        id="backdrop"
        className={`relative w-full bg-gray-900/25 rounded-md`}
      >
        {media.backdrop && (
          <Image
            src={media.backdrop}
            alt="Backdrop"
            fill={true}
            objectFit="cover"
            className="-z-10 rounded-md"
          />
        )}
        <div className="grid grid-cols-6 grid-rows-4 h-full p-4 bg-gray-900/25 rounded-md">
          {media.poster ? (
            <div className="flex justify-start col-span-2 row-span-4">
              <Image
                src={media.poster}
                alt="Poster"
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
            {media.name}
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
          <p className="pr-8 mb-8">{media.overview}</p>
          {media.seasons.map((season) => (
            <SeasonContainer
              season={season}
              tmdb_id={media.tmdb_id}
              key={season.name}
            />
          ))}
        </div>

        <div className="-translate-y-8 w-3/6 h-fit">
          <InfoCard media={media} />
        </div>
      </div>
    </div>
  );
}

function Tags({ tags }: { tags: { id: number; name: string }[] }) {
  return (
    <div className="flex gap-1.5">
      {tags?.map((tag, index) => (
        <div key={tag.id}>
          <span className="tag">
            {tag?.name}
            {index !== tags.length - 1 && ","}
          </span>
        </div>
      ))}
    </div>
  );
}

function WatchOnButton({
  stream_name,
  mediaType,
}: {
  stream_name: string;
  mediaType: string;
}) {
  switch (mediaType) {
    case "anime":
      return (
        <Image
          src="https://aniworld.to/public/svg/aniworld-anicloud-anime-stream-logo.svg"
          alt="Aniworld"
          width={150}
          height={50}
          style={{ backgroundColor: "#637cf9" }}
          className="h-10 hover:scale-105 cursor-pointer transition-transform ease-in-out duration-300 rounded-md"
          onClick={() =>
            window.open(
              `https://aniworld.to/anime/stream/${stream_name}`,
              "_blank"
            )
          }
        />
      );
    case "serie":
      return (
        <Image
          src="https://s.to/public/img/logo-sto-serienstream-sx-to-serien-online-streaming-vod.svg"
          alt="SerienStream"
          width={150}
          height={50}
          className="h-10 hover:scale-105 cursor-pointer transition-transform ease-in-out duration-300 rounded-md"
          onClick={() =>
            window.open(`https://s.to/serie/stream/${stream_name}`, "_blank")
          }
        />
      );
    default:
      return <h1></h1>;
  }
}
