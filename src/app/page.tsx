"use client";
import { useEffect, useState, useRef } from "react";
import { IMedia } from "./interfaces";
import { BackdropMediaCard, PosterMediaCard } from "./utils/mediaCards";
import { ScrollToTop } from "./components/scrollToRef";
import { useAppConfigContext } from "./utils/appConfigContext";

export default function Overview() {
  const appConfig = useAppConfigContext();

  const [trendingAnime, setTrendingAnime] = useState<IMedia[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<IMedia[]>([]);
  const [selectedType, setSelectedType] = useState("anime");

  const containerRef = useRef<HTMLDivElement>(null);

  const getTrendingAnime = async () => {
    fetch(`${appConfig.backend_url}/trending/animes`)
      .then((response) => response.json())
      .then((data) => {
        setTrendingAnime(data);
      });
  };

  const getTrendingSeries = async () => {
    fetch(`${appConfig.backend_url}/trending/series`)
      .then((response) => response.json())
      .then((data) => {
        setTrendingSeries(data);
      });
  };

  useEffect(() => {
    getTrendingAnime();
    getTrendingSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function TypeSwitch() {
    return (
      <div className="flex items-center justify-between w-full h-20">
        <h1 className="text-headLine w-[20%]">Also Trending</h1>
        <p className="w-[50%] border border-gray-400" />
        <div
          id="typeSwitcher"
          className="flex justify-between w-[20%] h-16 bg-gray-400/25 rounded-sm"
        >
          <button
            className={
              (selectedType == "anime" ? "bg-gray-900/75" : "") +
              " w-full cursor-pointer"
            }
            onClick={() => setSelectedType("anime")}
          >
            Anime
          </button>
          <button
            className={
              (selectedType == "serie" ? "bg-gray-900/75" : "") +
              " w-full cursor-pointer"
            }
            onClick={() => setSelectedType("serie")}
          >
            Series
          </button>
        </div>
      </div>
    );
  }

  function getRightMedia(itemPosition: number) {
    if (selectedType == "anime") {
      return trendingAnime[itemPosition];
    } else {
      return trendingSeries[itemPosition];
    }
  }

  return (
    <ScrollToTop className="w-full h-full">
      <h1 className="text-headLine">Overview</h1>
      <div
        id="firstContainer"
        className="grid grid-cols-7 grid-rows-2 gap-4 w-full h-3/5"
      >
        <BackdropMediaCard
          media={getRightMedia(0)}
          className="row-span-2 col-span-5"
        />
        <PosterMediaCard
          media={getRightMedia(1)}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={getRightMedia(2)}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={getRightMedia(3)}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={getRightMedia(4)}
          className="row-span-1 col-span-1"
        />
      </div>
      <div id="secondContainer" className="w-full h-full">
        <div className="flex justify-between my-2">
          <TypeSwitch />
        </div>
        <div
          id="currentlyTrending"
          className="h-full grid grid-cols-5 grid-rows-3 gap-4"
          ref={containerRef}
        >
          {Array.from({ length: 16 }, (v, i) => i).map((index) => {
            return (
              <PosterMediaCard
                key={index}
                media={getRightMedia(index + 5)}
                className="row-span-1 col-span-1"
              />
            );
          })}
        </div>
      </div>
    </ScrollToTop>
  );
}
