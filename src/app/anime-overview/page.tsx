"use client";
import { useState, useEffect } from "react";
import { IMedia } from "../interfaces";
import { SearchBar } from "../components/ui/searchBar";
import { ScrollContainer } from "../components/scrollToRef";
import { useAppConfigContext } from "../utils/useAppConfigContext";
import { BackdropMediaCard } from "../components/ui/BackdropMediaCard";
import { PosterMediaCard } from "../components/ui/PosterMediaCard";

export default function Page() {
  const appConfig = useAppConfigContext();

  const [randomMediaMix, setRandomMediaMix] = useState<IMedia[]>([]); // Store 5 random media items
  const [mediaList, setMediaList] = useState<IMedia[]>([]); // Store all media items
  const [search, setSearch] = useState("");

  useEffect(() => {
    collectRandomMedia();
    collectInitialMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function collectSearchResults() {
      try {
        const response = await fetch(
          `${appConfig.backend_url}/media/animes?page=0&search=${search}`
        );
        if (!response.ok) {
          setMediaList([]);
          return;
        }
        const data = await response.json();
        setMediaList(data);
      } catch {
        setMediaList([]);
      }
    }

    if (search) {
      collectSearchResults();
    } else {
      collectInitialMedia();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function collectRandomMedia() {
    try {
      const response = await fetch(
        `${appConfig.backend_url}/random/animes?amount=5`
      );
      if (!response.ok) {
        setRandomMediaMix([]);
        return;
      }
      const data = await response.json();
      setRandomMediaMix(data);
    } catch {
      setRandomMediaMix([]);
    }
  }

  async function collectInitialMedia() {
    try {
      const response = await fetch(
        `${appConfig.backend_url}/media/animes?&page=0`
      );
      if (!response.ok) {
        setMediaList([]);
        return;
      }
      const data = await response.json();
      setMediaList(data);
    } catch {
      setMediaList([]);
    }
  }

  const getMoreMedia = async (page: number): Promise<boolean> => {
    return fetch(
      `${appConfig.backend_url}/media/animes?page=${page}&search=${search}`
    )
      .then((response) => response.json())
      .then((data: IMedia[]) => {
        setMediaList((prevMediaList) => [...prevMediaList, ...data]);
        return data.length === 0; // Return true if no data was returned
      })
      .catch(() => true); // Return true in case of an error
  };

  return (
    <ScrollContainer className="w-full h-full" endOfPageCallback={getMoreMedia}>
      <div className="flex justify-between">
        <h1 className="text-headLine">Anime Overview</h1>{" "}
        <SearchBar setSearch={setSearch} />
      </div>
      <div
        id="headContainer"
        data-testid="headContainer"
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
      <div data-testid="bodyContainer" id="bodyContainer" className="grid grid-cols-5 gap-4">
        {mediaList.map((media, index) => (
          <PosterMediaCard key={index} media={media} />
        ))}
      </div>
    </ScrollContainer>
  );
}
