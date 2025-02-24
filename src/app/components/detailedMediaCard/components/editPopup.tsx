"use client";

import { useEffect, useRef, useState } from "react";
import { IShow, ItmdbSearch } from "../../../interfaces";
import { SearchMediaCard } from "../../../utils/mediaCards";
import { SearchBar } from "../../../utils/searchBar";
import { useAppConfigContext } from "../../../utils/appConfigContext";

export function EditPopup({
  selectedmedia,
  closePopup,
}: {
  selectedmedia: IShow;
  closePopup: () => void;
}) {
  const appConfig = useAppConfigContext();
  const popupRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState(selectedmedia.name);
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<ItmdbSearch[]>([]);

  async function updateMedia(streamName: string, tmdbId: number) {
    setLoading(true);
    await fetch(
      appConfig.backend_url +
        `/detailed-media/update-tmdb?streamName=${streamName}&tmdbID=${tmdbId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => console.log(streamName, tmdbId));
    setLoading(false);
    setMedia([]);
    closePopup();
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, closePopup]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePopup();
    });
  });

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(
        appConfig.backend_url + "/detailed-media/tmdb-search?query=" + search,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();
      setMedia(data);
    }
    fetchData();
  }, [search]);

  return (
    <div className="fixed inset-0">
      <div className="flex items-center justify-center w-screen h-screen bg-black/25">
        <div
          id="EditPopup"
          ref={popupRef}
          className="w-1/3 h-2/3 bg-gray-900/95 border-gray-500 border rounded-lg"
        >
          <div id="searchBar" className="flex h-[7%] my-4 px-4 rounded-t-lg">
            <SearchBar
              className="w-full"
              defaultValue={selectedmedia.name}
              setSearch={setSearch}
            />
          </div>
          <div
            id="MediaSelectionList"
            className="flex flex-col h-[90%] px-4 gap-2 overflow-y-auto scrollbar-hidden"
          >
            {loading ? (
              <Loading />
            ) : (
              media?.map((media) => (
                <SearchMediaCard
                  key={media.id}
                  selectedmedia={selectedmedia}
                  media={media}
                  updateMedia={updateMedia}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-2xl animate-pulse">Updating Media ...</h1>
    </div>
  );
}
