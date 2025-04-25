"use client";
import { useEffect, useState } from "react";
import { IMedia } from "../interfaces";
import { ScrollContainer } from "../components/scrollToRef";
import { useAppConfigContext } from "../utils/useAppConfigContext";
import { SearchBar } from "../components/ui/searchBar";
import { TypeSwitch } from "../components/ui/MediaTypeSwitch";
import { BackdropMediaCard } from "../components/ui/BackdropMediaCard";
import { PosterMediaCard } from "../components/ui/PosterMediaCard";

export default function Page() {
  const appConfig = useAppConfigContext();

  const [selectedType, setSelectedType] = useState<string>("anime");
  const [randomLoclMedia, setRandomLocalMedia] = useState<IMedia[]>([]);
  const [localMedia, setLocalMedia] = useState<IMedia[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getRandomLocalMedia();
    getLocalMedia(0, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getRandomLocalMedia();
    getLocalMedia(0, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  useEffect(() => {
    getLocalMedia(0, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const getRandomLocalMedia = async () => {
    fetch(`${appConfig.backend_url}/random/local?amount=5&type=${selectedType}`)
      .then((response) => response.json())
      .then((data: IMedia[]) => {
        setRandomLocalMedia(data);
      });
  };

  const getLocalMedia = async (page: number, search: string) => {
    fetch(
      `${appConfig.backend_url}/media/local?type=${selectedType}&page=${page}&search=${search}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocalMedia(data);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMoreMedia = async (page: number): Promise<boolean> => {
    return fetch(
      `${appConfig.backend_url}/media/local?page=${page}&search=${search}`
    )
      .then((response) => response.json())
      .then((data: IMedia[]) => {
        setLocalMedia((prevMediaList) => [...prevMediaList, ...data]);
        return data.length === 0; // Return true if no data was returned
      })
      .catch(() => true); // Return true in case of an error
  };

  return (
    <ScrollContainer className="w-full h-full" endOfPageCallback={getMoreMedia}>
      <div className="flex justify-between">
        <h1 className="text-headLine">Locally Available</h1>
        <SearchBar setSearch={setSearch} />
      </div>
      <div
        id="firstContainer"
        className="grid grid-cols-7 grid-rows-2 gap-4 w-full h-3/5"
      >
        <BackdropMediaCard
          media={randomLoclMedia[0]}
          className="row-span-2 col-span-5"
        />
        <PosterMediaCard
          media={randomLoclMedia[1]}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={randomLoclMedia[2]}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={randomLoclMedia[3]}
          className="row-span-1 col-span-1"
        />
        <PosterMediaCard
          media={randomLoclMedia[4]}
          className="row-span-1 col-span-1"
        />
      </div>
      <div id="secondContainer" className="w-full h-full">
        <div className="flex justify-end my-2">
          <TypeSwitch
            label=""
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
        <div
          id="currentlyTrending"
          className="grid grid-cols-5 grid-rows-3 gap-4"
        >
          {localMedia
            .filter((media) => media.type == selectedType)
            .map((media, index) => (
              <PosterMediaCard key={index} media={media} />
            ))}
        </div>
      </div>
    </ScrollContainer>
  );
}
