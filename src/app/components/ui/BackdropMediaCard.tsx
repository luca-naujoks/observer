"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IMedia } from "../../interfaces";
import Image from "next/image";

export function BackdropMediaCard({
  media,
  className,
}: {
  media: IMedia;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [ImageError, setImageError] = useState(false);

  const router = useRouter();

  if (media) {
    return (
      <div
        className={`${className} relative rounded-md bg-gray-900/50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push(`/media?stream_name=${media.stream_name}`)}
      >
        <Image
          src={!ImageError ? media.backdrop : "/missing-backdrop.webp"}
          alt="backdrop"
          fill={true}
          objectFit="cover"
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
      </div>
    );
  } else {
    return (
      <div className={`${className} relative rounded-md bg-gray-900/50`}>
        <Image
          src={"/missing-backdrop.webp"}
          alt="backdrop"
          fill={true}
          objectFit="cover"
          className="opacity-50 rounded-md"
          priority={true}
        />
      </div>
    );
  }
}
