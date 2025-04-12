"use client";
import { useEffect, useState, useRef } from "react";
import { IMedia } from "./interfaces";
import { BackdropMediaCard, PosterMediaCard } from "./utils/mediaCards";
import { ScrollContainer } from "./components/scrollToRef";
import { useAppConfigContext } from "./utils/appConfigContext";
import { TypeSwitch } from "./components/ui/MediaTypeSwitch";

export default function Overview() {
  const appConfig = useAppConfigContext();

  const [trendingAnime, setTrendingAnime] = useState<IMedia[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<IMedia[]>([]);
  const [selectedType, setSelectedType] = useState<string>("anime");

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

  function getRightMedia(itemPosition: number) {
    if (selectedType == "anime") {
      return trendingAnime[itemPosition];
    } else {
      return trendingSeries[itemPosition];
    }
  }

  return (
    <ScrollContainer className="w-full h-full">
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
          <TypeSwitch
            label="Also Trending"
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
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
    </ScrollContainer>
  );
}
