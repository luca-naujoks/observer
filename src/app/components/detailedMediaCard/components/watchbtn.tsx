import Image from "next/image";

export function WatchOnButton({
  stream_name,
  mediaType,
}: {
  stream_name: string;
  mediaType: string;
}) {
  switch (mediaType) {
    case "anime":
      return (
        <Image
          src="https://aniworld.to/public/svg/aniworld-anicloud-anime-stream-logo.svg"
          alt="Aniworld"
          width={150}
          height={50}
          style={{ backgroundColor: "#637cf9" }}
          className="h-10 hover:scale-105 cursor-pointer transition-transform ease-in-out duration-300 rounded-md"
          onClick={() =>
            window.open(
              `https://aniworld.to/anime/stream/${stream_name}`,
              "_blank"
            )
          }
        />
      );
    case "serie":
      return (
        <Image
          src="https://s.to/public/img/logo-sto-serienstream-sx-to-serien-online-streaming-vod.svg"
          alt="SerienStream"
          width={150}
          height={50}
          className="h-10 hover:scale-105 cursor-pointer transition-transform ease-in-out duration-300 rounded-md"
          onClick={() =>
            window.open(`https://s.to/serie/stream/${stream_name}`, "_blank")
          }
        />
      );
    default:
      return <h1></h1>;
  }
}
