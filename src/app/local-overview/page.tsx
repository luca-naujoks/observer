"use client";
import { useEffect, useState } from "react";
import { IBackendMedia } from "../interfaces";
import { BackdropMediaCard, PosterMediaCard } from "../utils/mediaCards";
import { ScrollToTop } from "../components/scrollToRef";
import { useAppConfigContext } from "../utils/appConfigContext";
import { SearchBar } from "../utils/searchBar";

export default function Page() {
  const appConfig = useAppConfigContext();

  const [selectedType, setSelectedType] = useState<string>("anime");
  const [randomLoclMedia, setRandomLocalMedia] = useState<IBackendMedia[]>([]);
  const [localMedia, setLocalMedia] = useState<IBackendMedia[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getRandomLocalMedia();
    getLocalMedia(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getRandomLocalMedia();
    getLocalMedia(0, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      getMoreLocalMedia(page, search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localMedia]);

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const container = document.getElementById("media-container");
        if (container) {
          const bottom = container.scrollHeight - container.clientHeight;
          if (bottom - container.scrollTop < 300 && !loading) {
            setPage((prevPage) => prevPage + 1);
          }
        }
      }, 200);
    };

    const container = document.getElementById("media-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      clearTimeout(debounceTimer);
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  useEffect(() => {
    getLocalMedia(0, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const getRandomLocalMedia = async () => {
    fetch(
      `${appConfig.backend_url}/random/local?amount=5&type=${selectedType}`
    )
      .then((response) => response.json())
      .then((data: IBackendMedia[]) => {
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

  const getMoreLocalMedia = async (page: number, search: string) => {
    fetch(
      `${appConfig.backend_url}/local/shows?page=${page}&search=${search}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocalMedia(localMedia.concat(data));
      });
  };

  function TypeSwitch() {
    return (
      <div className="flex items-center justify-end w-full h-20">
        <p className="w-[50%] mr-[5%] border border-gray-400" />
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

  return (
    <ScrollToTop className="w-full h-full">
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
          <TypeSwitch />
        </div>
        <div
          id="currentlyTrending"
          className="h-full grid grid-cols-7 grid-rows-3 gap-4"
        >
          {localMedia.map((media, index) => (
            <PosterMediaCard key={index} media={media} />
          ))}
        </div>
      </div>
    </ScrollToTop>
  );
}
