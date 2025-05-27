"use client";

import { useEffect, useRef, useState } from "react";
import { SearchMediaCard } from "../../components/ui/SearchMediaCard";
import { IDetailedMedia } from "../../interfaces";
import { useAppConfigContext } from "../../utils/useAppConfigContext";
import { SearchBar } from "../../components/ui/searchBar";
import { useRouter } from "next/navigation";

export function EditPopup({
  selectedmedia,
  closePopup,
}: {
  selectedmedia: IDetailedMedia;
  closePopup: () => void;
}) {
  const appConfig = useAppConfigContext();
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [search, setSearch] = useState(selectedmedia.name);
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<IDetailedMedia[]>([]);

  async function updateMedia(external_identifier: string, tmdb_id: number) {
    setLoading(true);
    try {
      const response = await fetch(
        appConfig.backend_url +
          `/detailed-media/update-tmdb?external_identifier=${external_identifier}&tmdb_id=${tmdb_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update media: ${response.statusText}`);
      }
      setMedia([]);
      closePopup();
      router.refresh();
    } catch (error) {
      console.error("Error updating media:", error);
      // show an error message
    } finally {
      setLoading(false);
    }
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
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closePopup]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(
        appConfig.backend_url + "/detailed-media/search?query=" + search,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="flex items-center justify-center w-screen h-screen bg-black/25">
        <div
          id="EditPopup"
          ref={popupRef}
          className="w-1/2 h-2/3 bg-gray-900 border-gray-500 border rounded-lg"
        >
          <div
            id="searchBar"
            className="flex h-[7%] my-4 mb-8 px-4 rounded-t-lg"
          >
            <SearchBar
              className="w-full"
              defaultValue={selectedmedia.name}
              setSearch={setSearch}
            />
          </div>
          <div
            id="MediaSelectionList"
            className="flex flex-col h-[80%] px-4 gap-2 overflow-y-scroll"
          >
            {loading ? (
              <Loading />
            ) : (
              media?.map((media) => (
                <SearchMediaCard
                  key={media.tmdb_id}
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
    <div className="flex items-center justify-center w-full h-64">
      <h1 className="text-2xl animate-pulse">Updating Media ...</h1>
    </div>
  );
}
