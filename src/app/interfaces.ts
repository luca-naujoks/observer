export interface IMedia {
  id: number;
  type: string;
  external_identifier: string;
  name: string;
  poster: string;
  backdrop: string;
  online_available: string;
}

// Used for Posters and basic Media data
export interface IDetailedMedia {
  id: number;
  type: string;
  tmdb_id: number;
  external_identifier: string;
  name: string;
  tags: { id: number; name: string }[];
  poster: string;
  backdrop: string;

  vote_average: number;
  original_name: string;
  overview: string;
  original_language: string;
  first_air_date: string;
  status: string;
  episode_run_time: number;
  number_of_episodes: number;
  production_country: string;

  seasons: { name: string; season_number: number }[];
}

export interface ISeason {
  episodes: IEpisode[];
}

interface IEpisode {
  name: string;
  air_date: string;
  episode_number: number;
  episode_type: string;
  local_available: boolean;
}

// Interface for frontend config.json
export interface IFrontendConfig {
  appName: string;
  appVersion: string;
  configured: boolean;
  backend_url: string;
  background_image: boolean;
}

export interface IBackendConfig {
  TmdbApiKey: string;
  AnimeDir: string;
  SeriesDir: string;
  PageSize: number;
}

export interface IProvider {
  name: string;
  variables: string[];
  schedule: string;
  file_path: string;
  enabled: boolean;
}
