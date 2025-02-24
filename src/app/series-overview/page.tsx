"use client";

import { useEffect, useState } from "react";
import { IBackendMedia } from "../interfaces";
import { BackdropMediaCard, PosterMediaCard } from "../utils/mediaCards";
import { SearchBar } from "../utils/searchBar";
import { ScrollToTop } from "../components/scrollToRef";
import { useAppConfigContext } from "../utils/appConfigContext";

export default function SeriesOverview() {

  const appConfig = useAppConfigContext();

  const [randomMediaMix, setRandomMediaMix] = useState<IBackendMedia[]>([]); // Store 5 random media items
  const [mediaList, setMediaList] = useState<IBackendMedia[]>([]); // Store all media items
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if(page > 1000) {
      collectMoreMedia();
    }
    console.log(appConfig);
    collectRandomMedia();
    collectInitialMedia();
  }, []);

  useEffect(() => {
    function collectSearchResults() {
      fetch(
        `${appConfig.backend_url}/media/series?search=${search}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMediaList(data);
        });
    }

    if (search) {
      collectSearchResults();
      setPage(0);
    } else {
      collectInitialMedia();
      setPage(0);
    }
  }, [search]);

  function collectRandomMedia() {
    fetch(`${appConfig.backend_url}/random/series?amount=5`)
      .then((response) => response.json())
      .then((data: IBackendMedia[]) => {
        setRandomMediaMix(data);
      });
  }

  function collectInitialMedia() {
    fetch(`${appConfig.backend_url}/media/series?&page=0`)
      .then((response) => response.json())
      .then((data) => {
        setMediaList(data);
      });
  }

  function collectMoreMedia() {
    fetch(
      `${appConfig.backend_url}/media/series?&page=${page + 1}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMediaList([...mediaList, ...data]);
      });
  }

  return (
    <ScrollToTop className="w-full h-full">
      <div className="flex justify-between">
        <h1 className="text-headLine">Series Overview</h1>{" "}
        <SearchBar setSearch={setSearch} />
      </div>
      <div
        id="firstContainer"
        className="grid grid-cols-7 grid-rows-2 gap-4 w-full h-3/5"
      >
        <BackdropMediaCard
          media={randomMediaMix[0]}
          className="row-span-2 col-span-5"
        />
        <PosterMediaCard
          media={randomMediaMix[1]}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={randomMediaMix[2]}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={randomMediaMix[3]}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={randomMediaMix[4]}
          className="row-span-1 col-span-1"
        />
      </div>
      <p className="my-4 mb-8 mx-[25%] border border-gray-400" />
      <div id="seriesContainer" className="grid grid-cols-7 gap-4">
        {mediaList.map((media, index) => (
          <PosterMediaCard key={index} media={media} className="h-96" />
        ))}
      </div>
    </ScrollToTop>
  );
}
