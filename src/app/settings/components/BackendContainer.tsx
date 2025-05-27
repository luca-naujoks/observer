import { useEffect, useState } from "react";
import { FormInput } from "../../components/Form/FormInput";
import { IBackendConfig } from "../../interfaces";
import { useAppConfigContext } from "../../utils/useAppConfigContext";
import { SettingsContainer } from "./SettingsContainer";
import { Button } from "../../components/ui/Button";

export function BackendContainer() {
  const appConfig = useAppConfigContext();
  const [tmdbApiKey, setTmdbApiKey] = useState<string>("");
  const [animeDir, setAnimeDir] = useState<string>("");
  const [seriesDir, setSeriesDir] = useState<string>("");
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
      setSeriesDir(data.SeriesDir || "");
      setPageSize(data.PageSize?.toString() || "");
    }
  }
  async function saveBackendConfig() {
    const payload: IBackendConfig = {
      TmdbApiKey: tmdbApiKey,
      AnimeDir: animeDir,
      SeriesDir: seriesDir,
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
        break;
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
      />
      <FormInput
        label="Anime Directory"
        placeholder="Enter Anime Directory"
        value={animeDir}
        setValue={setAnimeDir}
      />
      <FormInput
        label="Series Directory"
        placeholder="Enter Series Directory"
        value={seriesDir}
        setValue={setSeriesDir}
      />
      <FormInput
        label="Page Size"
        placeholder="Page Size"
        value={PageSize}
        setValue={setPageSize}
      />
      <Button
        className="items-end"
        onclick={() => saveBackendConfig()}
        disabled={false}
        buttonText="Save"
      />
    </SettingsContainer>
  );
}
