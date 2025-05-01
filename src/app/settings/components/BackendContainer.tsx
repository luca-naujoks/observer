import { useEffect, useState } from "react";
import { FormInput } from "../../components/ui/FormInput";
import { IBackendConfig } from "../../interfaces";
import { useAppConfigContext } from "../../utils/useAppConfigContext";
import { SettingsContainer } from "./SettingsContainer";
import { Button } from "../../components/ui/Button";

export function BackendContainer() {
  const appConfig = useAppConfigContext();
  const [tmdbApiKey, setTmdbApiKey] = useState<string>("");
  const [animeDir, setAnimeDir] = useState<string>("");
  const [animeUrl, setAnimeUrl] = useState<string>("");
  const [seriesDir, setSeriesDir] = useState<string>("");
  const [seriesUrl, setSeriesUrl] = useState<string>("");
  const [PageSize, setPageSize] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      await getBackendConfig();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getBackendConfig() {
    const response = await fetch(appConfig.backend_url + "/setup", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTmdbApiKey(data.TmdbApiKey || "");
      setAnimeDir(data.AnimeDir || "");
      setAnimeUrl(data.AnimeUrl || "");
      setSeriesDir(data.SeriesDir || "");
      setSeriesUrl(data.SeriesUrl || "");
      setPageSize(data.PageSize?.toString() || "");
    }
  }
  async function saveBackendConfig() {
    const payload: IBackendConfig = {
      TmdbApiKey: tmdbApiKey,
      AnimeDir: animeDir,
      AnimeUrl: animeUrl,
      SeriesDir: seriesDir,
      SeriesUrl: seriesUrl,
      PageSize: parseInt(PageSize),
    };

    const request = await fetch(appConfig.backend_url + "/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    switch (true) {
      case request.status == 201:
        getBackendConfig();
      case request.status == 400:
        return;
    }
  }

  return (
    <SettingsContainer title="Backend Configuration">
      <FormInput
        label="TMDB API Key"
        placeholder="Enter TMDB API Key"
        value={tmdbApiKey}
        setValue={setTmdbApiKey}
        width="w-2/3"
      />
      <FormInput
        label="Anime Directory"
        placeholder="Enter Anime Directory"
        value={animeDir}
        setValue={setAnimeDir}
        width="w-2/3"
      />
      <FormInput
        label="Anime Domain"
        placeholder="Enter Anime Provider Domain"
        value={animeUrl}
        setValue={setAnimeUrl}
        width="w-2/3"
      />
      <FormInput
        label="Series Directory"
        placeholder="Enter Series Directory"
        value={seriesDir}
        setValue={setSeriesDir}
        width="w-2/3"
      />
      <FormInput
        label="Series Domain"
        placeholder="Enter Series Provider Domain"
        value={seriesUrl}
        setValue={setSeriesUrl}
        width="w-2/3"
      />
      <FormInput
        label="Page Size"
        placeholder="Page Size"
        value={PageSize}
        setValue={setPageSize}
        width="w-2/3"
      />
      <Button
        className="items-end"
        onclick={() => saveBackendConfig()}
        disabled={false}
        buttonText="Save"
        width="w-2/3"
      />
    </SettingsContainer>
  );
}
