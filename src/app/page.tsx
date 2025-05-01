"use client";
import { useEffect, useState, useRef } from "react";
import { IMedia } from "./interfaces";
import { ScrollContainer } from "./components/scrollToRef";
import { useAppConfigContext } from "./utils/useAppConfigContext";
import { TypeSwitch } from "./components/ui/MediaTypeSwitch";
import { BackdropMediaCard } from "./components/ui/BackdropMediaCard";
import { PosterMediaCard } from "./components/ui/PosterMediaCard";

export default function Overview() {
  const appConfig = useAppConfigContext();

  const [trendingAnime, setTrendingAnime] = useState<IMedia[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<IMedia[]>([]);
  const [selectedType, setSelectedType] = useState<string>("anime");

  const containerRef = useRef<HTMLDivElement>(null);

  const getTrendingAnime = async () => {
    try {
      const response = await fetch(`${appConfig.backend_url}/trending/animes`);
      if (!response.ok) {
        setTrendingAnime([]);
        return;
      }
      const data = await response.json();
      setTrendingAnime(data);
    } catch {
      setTrendingAnime([]);
    }
  };

  const getTrendingSeries = async () => {
    try {
      const response = await fetch(`${appConfig.backend_url}/trending/series`);
      if (!response.ok) {
        setTrendingSeries([]);
        return;
      }
      const data = await response.json();
      setTrendingSeries(data);
    } catch {
      setTrendingSeries([]);
    }
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
        id="headContainer"
        data-testid="headContainer"
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
      <div data-testid="bodyContainer" id="bodyContainer" className="w-full h-full">
        <div className="flex justify-between my-2">
          <TypeSwitch
            label="Also Trending"
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
        <div
          id="currentlyTrending"
          className="h-full grid grid-cols-5 gap-4"
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
