"use client";
import { useState } from "react";
import { IMedia } from "../../interfaces";
import Image from "next/image";
import Link from "next/link";

export function BackdropMediaCard({
  media,
  className,
}: {
  media: IMedia;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [ImageError, setImageError] = useState(false);

  if (media) {
    return (
      <Link
        className={`${className} relative rounded-md bg-gray-900/50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        href={`/media?external_identifier=${media.external_identifier}`}
      >
        <Image
          src={!ImageError ? media.backdrop : "/missing-backdrop.webp"}
          alt="backdrop"
          fill={true}
          style={{ objectFit: "cover" }}
          className="rounded-md"
          priority={true}
          onError={() => setImageError(true)}
        />
        <div
          className={`${
            isHovered ? "h-full w-full p-4 bg-gray-900/50 rounded-md" : "hidden"
          } absolute top-0 left-0 transition-all duration-300 ease-in-out`}
        >
          <h1 className="text-3xl font-bold">{media.name}</h1>
          <p className="text-lg">{media.type}</p>
        </div>
      </Link>
    );
  } else {
    return (
      <div className={`${className} relative rounded-md bg-gray-900/50`}>
        <Image
          src={"/missing-backdrop.webp"}
          alt="backdrop"
          fill={true}
          style={{ objectFit: "cover" }}
          className="opacity-50 rounded-md"
          priority={true}
        />
      </div>
    );
  }
}
