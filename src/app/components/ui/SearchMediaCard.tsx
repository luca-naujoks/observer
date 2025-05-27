import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { IDetailedMedia } from "../../interfaces";
import { BorderContainer } from "../../utils/borderContainer";
import { useEffect, useState } from "react";

export function SearchMediaCard({
  selectedmedia,
  media,
  updateMedia,
}: {
  selectedmedia: IDetailedMedia;
  media: IDetailedMedia;
  updateMedia: (external_identifier: string, tmdb_id: number) => void;
}) {
  const external_identifier =
    useSearchParams().get("external_identifier") || "";
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log(media.poster);
  }, []);

  if (media) {
    return (
      <BorderContainer className={`w-full h-64`}>
        <div className={`flex gap-4 w-full h-full rounded-md`}>
          <Image
            src={loading || imageError ? "/missing-poster.webp" : media.poster}
            priority={true}
            width={400}
            height={600}
            onLoad={() => setLoading(false)}
            onError={() => setImageError(true)}
            alt={media.name}
            className={
              "h-full w-1/6 rounded-md " +
              (loading ? "animate-pulse" : "animate-none")
            }
          />
          <div className="flex flex-col justify-between w-full h-full">
            <h1 className="text-2xl font-bold">{media.name}</h1>
            <>
              <p className="text-sm">Original Name: {media.original_name}</p>
              <p className="text-sm">ID: {media.tmdb_id}</p>
              <p className="text-sm">First Air Date: {media.first_air_date}</p>
            </>
            <button
              className={
                selectedmedia.tmdb_id === media.tmdb_id
                  ? "hidden"
                  : "customButton"
              }
              onClick={() => updateMedia(external_identifier, media.tmdb_id)}
            >
              Select This Medium
            </button>
          </div>
        </div>
      </BorderContainer>
    );
  } else {
    return <div className={`w-full h-36 bg-gray-900/50 rounded-md`} />;
  }
}
