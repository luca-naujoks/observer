"use client";

import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { LuFolderCheck } from "react-icons/lu";
import { ISeason } from "../../interfaces";
import { useAppConfigContext } from "../../utils/appConfigContext";

export function SeasonContainer({
  season,
  tmdb_id,
}: {
  season: {
    name: string;
    season_number: number;
  };
  tmdb_id: number;
}) {
  const appConfig = useAppConfigContext();

  const [seasonOpen, setSeasonOpen] = useState(false);
  const [seasonDetails, setSeasonDetails] = useState<ISeason>();

  async function getSeasonEpisodes(): Promise<ISeason> {
    const response = await fetch(
      `${appConfig.backend_url}/detailed-media/season?tmdb_id=${tmdb_id}&seasonNumber=${season.season_number}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch season episodes");
    }

    return (await response.json()) as ISeason;
  }

  useEffect(() => {
    async function fetchSeasonDetails() {
      if (!seasonOpen || seasonDetails != undefined) {
        return;
      }
      setSeasonDetails(await getSeasonEpisodes());
    }
    fetchSeasonDetails();
  }, [seasonOpen]);

  return (
    <div className="w-full p-4 mb-4 bg-gray-300/25 border-2 border-gray-500 rounded-md">
      <div
        className={`flex w-full h-full items-center justify-between ${
          seasonOpen ? "mb-4" : ""
        }`}
        onClick={() => setSeasonOpen(!seasonOpen)}
      >
        <h1 className="text-gray-400 font-semibold text-xl">{season.name}</h1>
        {seasonOpen ? <IoIosArrowDown /> : <IoIosArrowBack />}
      </div>
      {seasonOpen && seasonDetails ? (
        <div className="flex flex-col">
          {seasonDetails.episodes.map((episode, index) => (
            <div
              key={episode.name}
              className={`episode-item ${index == 0 ? "" : "border-t"}`}
            >
              <section>
                <p>{episode.episode_number}</p>
                <p>{episode.name}</p>
              </section>
              {episode.local_available ? <LuFolderCheck color="green" /> : null}
              {new Date(episode.air_date) > new Date() ? (
                <span>{episode.air_date}</span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
