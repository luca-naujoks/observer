"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";
import useSWR from "swr";
import { SeasonContainer } from "../components/ui/SeasonContainer";
import { IDetailedMedia } from "../interfaces";
import { useAppConfigContext } from "../utils/useAppConfigContext";
import Image from "next/image";
import { Tags } from "../components/ui/Tags";
import { InfoCard } from "./components/infoCard";
import { EditPopup } from "./components/editPopup";

export default function MediaComponent() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MediaComponentContent />
    </Suspense>
  );
}

function MediaComponentContent() {
  const router = useRouter();
  const appConfig = useAppConfigContext();
  const external_identifier =
    useSearchParams().get("external_identifier") || "";

  const fetcher = async (url: string): Promise<IDetailedMedia> => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        id: 0,
        type: "",
        tmdb_id: 0,
        external_identifier: "",
        name: "",
        overview: "",
        backdrop: "",
        poster: "",
        tags: [],
        seasons: [],
        status: "",

        vote_average: 0,
        production_country: "",
        original_name: "",
        original_language: "",
        first_air_date: "",
        episode_run_time: 0,
        number_of_episodes: 0,
      };
    }

    return response.json();
  };

  const { data: media, error } = useSWR<IDetailedMedia>(
    `${appConfig.backend_url}/detailed-media?external_identifier=${external_identifier}`,
    fetcher
  );

  const [onWatchList, setOnWatchList] = useState(false);

  const [backButtonHover, setBackButtonHover] = useState(false);

  const [editPopup, setEditPopup] = useState(false);
  const [backdropError, setBackdropError] = useState(false);
  const [posterError, setPosterError] = useState(false);

  const fetchMediaData = async () => {
    const response = await fetch(
      `${appConfig.backend_url}/detailed-media?external_identifier=${external_identifier}`,
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

  const fetchWatchListState = async () => {
    const response = await fetch(
      `${appConfig.backend_url}/watchlist/status?user=1&media_id=${media?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: boolean = await response.json();
    setOnWatchList(data);
  };

  useEffect(() => {
    if (media) {
      fetchWatchListState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media]);

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

  function handleWatchlistClick() {
    const url: string = `${appConfig.backend_url}/watchlist?media_id=${media?.id}&user=1`;
    fetch(url, {
      method: onWatchList ? "DELETE" : "POST",
    });
    setOnWatchList(!onWatchList);
  }

  if (!media || error) return <p>Loading...</p>;

  return (
    <Suspense>
      <div className="flex flex-col w-full h-full">
        {editPopup ? (
          <EditPopup selectedmedia={media} closePopup={handleEditClose} />
        ) : null}
        <div
          id="backdrop"
          className={`relative w-full bg-gray-900/25 rounded-md`}
        >
          <Image
            src={!backdropError ? media.backdrop : "/missing-backdrop.webp"}
            alt="Backdrop"
            priority={true}
            fill={true}
            style={{ objectFit: "cover" }}
            className="-z-10 rounded-md"
            onError={() => setBackdropError(true)}
          />
          <div className="flex justify-between h-full p-4 bg-gray-900/25 rounded-md">
            <Image
              src={!posterError ? media.poster : "/missing-poster.webp"}
              alt="Poster"
              width={440}
              height={660}
              className="rounded-xl"
              onError={() => setPosterError(true)}
            />
            <div className="flex flex-col flex-grow justify-end items-start ml-8 mb-8">
              <div id="NameAndTags" className="mb-24">
                <h1 className="text-5xl font-bold">{media.name}</h1>
                <Tags tags={media.tags} />
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
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
              <div className="flex flex-col items-end gap-4 mb-8">
                <button
                  className=" w-48"
                  onClick={() => handleWatchlistClick()}
                >
                  {onWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>
                <button className="customButton" onClick={handleEdit}>
                  Edit Media
                </button>
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
    </Suspense>
  );
}
