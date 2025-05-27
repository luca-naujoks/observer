"use client";
import { useState } from "react";
import { IMedia } from "../../interfaces";
import Image from "next/image";
import Link from "next/link";

export function PosterMediaCard({
  media,
  unoptimized,
  className,
}: {
  media: IMedia;
  unoptimized?: boolean;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (media) {
    return (
      <Link
        className={`${className} relative rounded-md bg-gray-900/50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        href={`/media?external_identifier=${media.external_identifier}`}
      >
        <Image
          src={!imageError ? media.poster : "/missing-poster.webp"}
          alt="poster"
          width={400}
          height={600}
          unoptimized={unoptimized}
          onError={() => setImageError(true)}
          className="w-full h-full rounded-md"
        />
        <div
          className={`${
            isHovered
              ? "flex flex-col justify-between h-full w-full p-1 bg-gray-900/50 overflow-x-hidden rounded-md"
              : "hidden"
          } absolute top-0 left-0 transition-all duration-300 ease-in-out`}
        >
          <h1 className="w-full h-[80%] overflow-y-hidden text-ellipsis text-3xl font-bold">
            {media.name}
          </h1>
          <p className="text-lg">{media.type}</p>
        </div>
      </Link>
    );
  } else {
    return (
      <div className={`${className} relative rounded-md bg-gray-900/50`}>
        <Image
          src={"/missing-poster.webp"}
          alt="poster"
          width={400}
          height={600}
          className="w-full h-full opacity-50 rounded-md"
        />
      </div>
    );
  }
}
