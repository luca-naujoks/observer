import Image from "next/image";

export function WatchOnButton({
  streamName,
  mediaType,
}: {
  streamName: string;
  mediaType: string;
}) {
  switch (mediaType) {
    case "anime":
      return (
          <Image src="https://aniworld.to/public/svg/aniworld-anicloud-anime-stream-logo.svg" alt="Aniworld" style={{ backgroundColor: "#637cf9" }}
          className="h-10 hover:scale-105 cursor-pointer transition-transform ease-in-out duration-300 rounded-md"
          onClick={() =>
            window.open(
              `https://aniworld.to/anime/stream/${streamName}`,
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
          className="h-10 hover:scale-105 cursor-pointer transition-transform ease-in-out duration-300 rounded-md"
          onClick={() =>
            window.open(`https://s.to/serie/stream/${streamName}`, "_blank")
          }
        />
      );
    default:
      return <h1></h1>;
  }
}