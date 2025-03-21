import { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { ISeasonDetails, ItmdbSeasonObject } from "../../../interfaces";
import { BorderContainer } from "../../../utils/borderContainer";
import { useAppConfigContext } from "../../../utils/appConfigContext";

export function SeasonContainer({
  season,
  localSeasons,
  tmdb_id,
}: {
  season: ItmdbSeasonObject;
  localSeasons: number[];
  tmdb_id: number;
}) {
  const appConfig = useAppConfigContext();
  const [openEpisodes, setOpenEpisodes] = useState(false);
  const [seasonDetails, setSeasonDetails] = useState<ISeasonDetails>();

  async function openEpisodesHandler() {
    const response = await fetch(
      `${appConfig.backend_url}/detailed-media/season?tmdb_id=${tmdb_id}&seasonNumber=${season.season_number}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: ISeasonDetails = await response.json();
    console.log(data);
    setSeasonDetails(data);

    setOpenEpisodes(!openEpisodes);
  }

  function SeasonAviability() {
    switch (localSeasons.length) {
      case 0:
        return "";
      case season.episode_count:
        return <h1 className="text-green-700">Available</h1>;
      default:
        return <h1 className="text-orange-700">Partially Available</h1>;
    }
  }

  function EpisodeAviability({ episode }: { episode: number }) {
    if (localSeasons.length === season.episode_count) {
      return;
    }

    if (localSeasons.includes(episode)) {
      return <h1 className="text-green-500">local</h1>;
    } else {
      return;
    }
  }

  return (
    <BorderContainer>
      <div
        key={season.id}
        className="flex flex-col w-full gap-1 cursor-pointer rounded-md"
        onClick={() => openEpisodesHandler()}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <h1 className="text-xl cursor-default">{season.name}</h1>
            <h1 className="text-sm -translate-y-1/3 text-gray-500 rounded-xl cursor-default">
              {season.episode_count}{" "}
              {season.season_number === 0 ? "specials" : "episodes"}
            </h1>
          </span>
          {openEpisodes ? (
            <div className="flex items-center gap-2">
              <SeasonAviability />
              <IoIosArrowBack className="cursor-pointer" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <SeasonAviability />
              <IoIosArrowDown className="cursor-pointer" />
            </div>
          )}
        </div>
        {openEpisodes ? (
          <div className="flex flex-col gap-1 px-2">
            {Array.from({ length: season.episode_count }, (_, i) => (
              <div
                key={i}
                className={`flex justify-between w-full gap-2 ${
                  i === season.episode_count - 1
                    ? "py-2"
                    : "pt-2 pb-1 border-gray-500 border-b"
                }`}
              >
                <div className="flex items-center w-full gap-2">
                  <span>
                    {seasonDetails?.episodes[i]?.episode_number} -{" "}
                    {seasonDetails?.episodes[i]?.name}
                  </span>
                  <span className="-translate-y-1/3 text-gray-500">
                    {seasonDetails?.episodes[i]?.air_date}
                  </span>
                </div>
                <EpisodeAviability episode={i + 1} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </BorderContainer>
  );
}
