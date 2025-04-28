"use client";

import { ScrollContainer } from "../components/scrollToRef";
import { BackdropMediaCard } from "../components/ui/BackdropMediaCard";
import { TypeSwitch } from "../components/ui/MediaTypeSwitch";
import { PosterMediaCard } from "../components/ui/PosterMediaCard";
import { IMedia } from "../interfaces";
import { useEffect, useState } from "react";
import { useAppConfigContext } from "../utils/useAppConfigContext";

export default function Watchlist() {
  const appConfig = useAppConfigContext();
  const [watchList, setWatchList] = useState<IMedia[]>([]);
  const [selectedType, setSelectedType] = useState<string>("anime");

  useEffect(() => {
    getWatchlist();
  }, []);

  async function getWatchlist() {
    try {
      const response = await fetch(`${appConfig.backend_url}/watchlist?user=1`);
      if (!response.ok) {
        setWatchList([]);
        return;
      }
      const data = await response.json();
      setWatchList(data);
    } catch {
      setWatchList([]);
    }
  }
  return (
    <ScrollContainer className="w-full h-full">
      <h1 className="text-headLine">Watchlist</h1>
      <div
        className={
          watchList.length > 0
            ? "hidden"
            : "flex flex-col items-center w-full h-full"
        }
      >
        <h1 className="secondHeaddline">Nothing here yet.</h1>
        <p>
          you can add some anime or series through the media view to your watch
          list to see them here.
        </p>
      </div>
      <div
        id="firstContainer"
        className={
          watchList.length <= 0
            ? "hidden"
            : `grid grid-cols-7 grid-rows-2 gap-4 w-full h-3/5`
        }
      >
        <BackdropMediaCard
          media={watchList[0]}
          className="row-span-2 col-span-5"
        />
        <PosterMediaCard
          media={watchList[1]}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={watchList[2]}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={watchList[3]}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={watchList[4]}
          className="row-span-1 col-span-1"
        />
      </div>
      <div
        id="secondContainer"
        className={watchList.length <= 0 ? "hidden" : "w-full h-full"}
      >
        <div className="flex justify-end my-2">
          <TypeSwitch
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
        <div
          id="currentlyTrending"
          className="grid grid-cols-5 grid-rows-3 gap-4"
        >
          {watchList
            .filter((media) => media.type == selectedType)
            .slice(5)
            .map((media, index) => (
              <PosterMediaCard key={index} media={media} />
            ))}
        </div>
      </div>
    </ScrollContainer>
  );
}
