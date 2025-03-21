import ISO6391 from "iso-639-1";
import { IShow } from "../../../interfaces";
export function InfoCard({ media }: { media: IShow }) {
  return (
    <div className="flex flex-col w-full h-fit gap-0.5 border-gray-500 border rounded-md">
      <div className="descriptionCardRow border-gray-500 border-b rounded-t-md">
        <h1>TMDB Score</h1>
        <span>
          {(media.vote_average * 10).toFixed(0)} {media.vote_average ? "%" : ""}
        </span>
      </div>
      <div className="descriptionCardRow border-gray-500 border-b">
        <h1>Original Name</h1>
        <span>{media.original_name}</span>
      </div>
      <div className="descriptionCardRow border-gray-500 border-b">
        <h1>Original Language</h1>
        <span>
          {media.original_language == "N/A"
            ? "N/A"
            : ISO6391.getName(media.original_language)}
        </span>
      </div>
      <div className="descriptionCardRow border-gray-500 border-b">
        <h1>Status</h1>
        <span>{media.status}</span>
      </div>
      <div className="descriptionCardRow border-gray-500 border-b">
        <h1>First Air Date</h1>
        <span>{media.first_air_date}</span>
      </div>
      <div className="descriptionCardRow border-gray-500 border-b">
        <h1>Episode Runtime</h1>
        <span>{media.episode_run_time} minutes</span>
      </div>
      <div className="descriptionCardRow border-gray-500 border-b">
        <h1>Episodes</h1>
        <span>{media.number_of_episodes}</span>
      </div>
      <div className="descriptionCardRow">
        <h1>Production</h1>
        <span>{media.production_country}</span>
      </div>
    </div>
  );
}
