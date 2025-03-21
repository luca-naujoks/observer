"use client";
import { useState, useEffect } from "react";
import { IMedia } from "../interfaces";
import { BackdropMediaCard, PosterMediaCard } from "../utils/mediaCards";
import { SearchBar } from "../utils/searchBar";
import { ScrollToTop } from "../components/scrollToRef";
import { useAppConfigContext } from "../utils/appConfigContext";

export default function AnimeOverview() {
  const appConfig = useAppConfigContext();

  const [randomMediaMix, setRandomMediaMix] = useState<IMedia[]>([]); // Store 5 random media items
  const [mediaList, setMediaList] = useState<IMedia[]>([]); // Store all media items
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page > 1000) {
      collectMoreMedia();
    }

    collectRandomMedia();
    collectInitialMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function collectSearchResults() {
      fetch(`${appConfig.backend_url}/media/animes?search=${search}`)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function collectRandomMedia() {
    fetch(`${appConfig.backend_url}/random/animes?amount=5`)
      .then((response) => response.json())
      .then((data: IMedia[]) => {
        setRandomMediaMix(data);
      });
  }

  function collectInitialMedia() {
    fetch(`${appConfig.backend_url}/media/animes?&page=0`)
      .then((response) => response.json())
      .then((data) => {
        setMediaList(data);
      });
  }

  function collectMoreMedia() {
    fetch(`${appConfig.backend_url}/media/animes?&page=${page + 1}`)
      .then((response) => response.json())
      .then((data) => {
        setMediaList([...mediaList, ...data]);
      });
  }

  return (
    <ScrollToTop className="w-full h-full">
      <div className="flex justify-between">
        <h1 className="text-headLine">Anime Overview</h1>{" "}
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
      <div id="currentlyTrending" className="grid grid-cols-5 gap-4">
        {mediaList.map((media, index) => (
          <PosterMediaCard key={index} media={media} className="h-96" />
        ))}
      </div>
    </ScrollToTop>
  );
}
