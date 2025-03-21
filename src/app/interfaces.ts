export interface IShow {
  type: string;
  tmdb_id: number;
  stream_name: string;
  name: string;
  tags: { id: number; name: string }[];
  poster: string;
  backdrop: string;
  localSeasons?: ILocalSeason[];

  vote_average: number;
  original_name: string;
  overview: string;
  original_language: string;
  first_air_date: string;
  status: string;
  episode_run_time: number;
  number_of_episodes: number;
  production_country: string;
  seasons: ItmdbSeasonObject[];
}

interface ILocalSeason {
  season: number;
  episode: number;
  attention: boolean;
}

export interface IMedia {
  type: string;
  tmdb_id: number;
  stream_name: string;
  name: string;
  tags: string[];
  poster: string;
  backdrop: string;
}

export interface ItmdbSearch {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface ItmdbSeasonObject {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

// return interface for the season details eg. /tv/{tv_id}/season/{season_number}
export interface ISeasonDetails {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface CrewMember {
  job: string;
  department: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface GuestStar {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface Episode {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: CrewMember[];
  guest_stars: GuestStar[];
}

export interface IAppConfig {
  appName: string;
  appVersion: string;
  configured: boolean;
  backend_url: string;
  background_image: boolean;
}

// Setup Configuration

export interface ISetupConfig {
  CONFIGURED: boolean;
  MONGO_URI: string;
  RABBITMQ_URI: string;
  RABBITMQ_QUEUE: string;
  TMDB_API_KEY: string;
  LOCAL_ANIME_PATH: string;
  LOCAL_SERIES_PATH: string;
  PAGE_SIZE: number;
}

export interface IScheduledTask {
  taskName: string;
  schedule: string;
}
