import ISO6391 from "iso-639-1";
import { IDetailedMedia } from "../../../interfaces";
export function InfoCard({ media }: { media: IDetailedMedia }) {
  const score = `${(media.vote_average * 10).toFixed(0)}${
    media.vote_average ? "%" : ""
  }`;
  const tmdb_id = `${media.tmdb_id}`;
  const original_name = `${media.original_name}`;
  const original_language = `${
    media.original_language == "N/A"
      ? "N/A"
      : ISO6391.getName(media.original_language)
  }`;
  const status = `${media.status}`;
  const first_air_date = `${media.first_air_date}`;
  const episode_run_time = `${media.episode_run_time}`;
  const number_of_episodes = `${media.number_of_episodes}`;
  const production_country = `${media.production_country}`;

  return (
    <div className="flex flex-col w-full h-fit gap-0.5 border-gray-500 border rounded-md">
      <div
        className="descriptionCardRow border-gray-500 border-b rounded-t-md"
        onClick={() => navigator.clipboard.writeText(score)}
      >
        <h1>TMDB Score</h1>
        <span>{score}</span>
      </div>
      <div
        className="descriptionCardRow border-gray-500 border-b rounded-t-md"
        onClick={() => navigator.clipboard.writeText(tmdb_id)}
      >
        <h1>TMDB ID</h1>
        <span>{tmdb_id}</span>
      </div>
      <div
        className="descriptionCardRow border-gray-500 border-b"
        onClick={() => navigator.clipboard.writeText(original_name)}
      >
        <h1>Original Name</h1>
        <span>{original_name}</span>
      </div>
      <div
        className="descriptionCardRow border-gray-500 border-b"
        onClick={() => navigator.clipboard.writeText(original_language)}
      >
        <h1>Original Language</h1>
        <span>{original_language}</span>
      </div>
      <div
        className="descriptionCardRow border-gray-500 border-b"
        onClick={() => navigator.clipboard.writeText(status)}
      >
        <h1>Status</h1>
        <span>{status}</span>
      </div>
      <div
        className="descriptionCardRow border-gray-500 border-b"
        onClick={() => navigator.clipboard.writeText(first_air_date)}
      >
        <h1>First Air Date</h1>
        <span>{first_air_date}</span>
      </div>
      <div
        className="descriptionCardRow border-gray-500 border-b"
        onClick={() => navigator.clipboard.writeText(episode_run_time)}
      >
        <h1>Episode Runtime</h1>
        <span>{episode_run_time} minutes</span>
      </div>
      <div
        className="descriptionCardRow border-gray-500 border-b"
        onClick={() => navigator.clipboard.writeText(number_of_episodes)}
      >
        <h1>Episodes</h1>
        <span>{number_of_episodes}</span>
      </div>
      <div
        className="descriptionCardRow"
        onClick={() => navigator.clipboard.writeText(production_country)}
      >
        <h1>Production</h1>
        <span>{production_country}</span>
      </div>
    </div>
  );
}
