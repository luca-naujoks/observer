import { useState } from "react";
import { IMedia, IShow, ItmdbSearch } from "../interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { BorderContainer } from "./borderContainer";
import Image from "next/image";

export function BackdropMediaCard({
  media,
  className,
}: {
  media: IMedia;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  if (media) {
    return (
      <div
        className={className + ` bg-cover bg-center rounded-md bg-gray-900/50`}
        style={{ backgroundImage: `url(${media.backdrop})` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push(`/media?stream_name=${media.stream_name}`)}
      >
        <div
          className={`${
            isHovered ? "h-full w-full p-4 bg-gray-900/50 rounded-md" : "hidden"
          }`}
        >
          <h1 className="text-3xl font-bold">{media.name}</h1>
          <p className="text-lg">{media.type}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={className + ` w-full h-full bg-gray-900/50 rounded-md`} />
    );
  }
}

export function PosterMediaCard({
  media,
  className,
}: {
  media: IMedia;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();
  if (media) {
    return (
      <div
        className={className + ` bg-cover bg-center rounded-md bg-gray-900/50`}
        style={{ backgroundImage: `url(${media?.poster})` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push(`/media?stream_name=${media.stream_name}`)}
      >
        <div
          className={`${
            isHovered ? "h-full w-full p-4 bg-gray-900/50 rounded-md" : "hidden"
          }`}
        >
          <h1 className="text-3xl font-bold">{media?.name}</h1>
          <p className="text-lg">{media?.type}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={className + ` w-full h-full bg-gray-900/50 rounded-md`} />
    );
  }
}

export function SearchMediaCard({
  selectedmedia,
  media,
  updateMedia,
}: {
  selectedmedia: IShow;
  media: ItmdbSearch;
  updateMedia: (stream_name: string, tmdb_id: number) => void;
}) {
  const stream_name = useSearchParams().get("stream_name") || "";

  if (media) {
    return (
      <BorderContainer className="w-full h-36 bg-gray-500/25">
        <div className="flex items-center gap-4 w-full h-full rounded-md">
          <Image
            src={"https://image.tmdb.org/t/p/original" + media.poster_path}
            alt=""
            className="h-full rounded-md"
          />
          <div className="w-full">
            <h1 className="text-2xl font-bold">{media.name}</h1>
            <p className="text-sm">Original Name: {media.original_name}</p>
            <p className="text-sm">First Air Date: {media.first_air_date}</p>
            <div className="flex w-full justify-between">
              <p className="text-sm">
                Adult Content: {media.adult ? "true" : "false"}
              </p>
              <button
                className={
                  selectedmedia.tmdb_id === media.id ? "hidden" : "customButton"
                }
                onClick={() => updateMedia(stream_name, media.id)}
              >
                Select This Medium
              </button>
            </div>
          </div>
        </div>
      </BorderContainer>
    );
  } else {
    return <div className={`w-full h-36 bg-gray-900/50 rounded-md`} />;
  }
}
