"use client";

import { useEffect, useState } from "react";
import { useAppConfigContext } from "../utils/appConfigContext";
import {
  ButtonElement,
  ImageUploadElement,
  InputElement,
  SettingsContainer,
  SyncJobElement,
} from "./components/elements.component";
import { ISetupConfig } from "../interfaces";
import { updateConfiguration } from "../actions/configurationProvider";

export default function Settings() {
  const appConfig = useAppConfigContext();
  const [backendConfig, setBackendConfig] = useState<ISetupConfig | undefined>(
    undefined
  );

  useEffect(() => {
    console.log("Fetching backend config");
    getBackendConfig().then((data) => {
      setBackendConfig(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getBackendConfig() {
    const response = await fetch(appConfig.backend_url + "/setup/config", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch backend config");
    }
  }

  async function saveFrontendConfig() {
    console.log("Save frontend config");
    updateConfiguration({
      ...appConfig,
      appName: appConfig.appName,
      backend_url:
        document.getElementById("Backend URL")?.getAttribute("value") ||
        appConfig.backend_url,
    });
  }

  async function saveBackendConfig() {
    console.log("Save backend config");
  }

  async function saveScheduledTasks() {
    console.log("Save scheduled tasks");
  }

  return (
    <div>
      <h1 className="text-headLine mb-4 ml-4">Settings</h1>
      <div className="grid grid-cols-2 w-full gap-4">
        <SettingsContainer title="Frontend Configuration">
          <InputElement
            heading="App Name"
            placeholder="App Name"
            value={appConfig.appName}
          />
          <InputElement
            heading="Backend URL"
            placeholder={"Backend URL"}
            value={appConfig.backend_url}
          />
          <ImageUploadElement />
          <ButtonElement
            className="items-end"
            onclick={() => saveFrontendConfig()}
            disabled={false}
            buttonText="Save"
          />
        </SettingsContainer>
        <SettingsContainer title="Synchronization Jobs">
          <SyncJobElement
            heading="Scan for new media in local library"
            taskName="default-local-scanner"
          />
          <SyncJobElement
            heading="Scan for new Media"
            taskName="default-scan-for-new-media"
          />
          <SyncJobElement
            heading="Scan for new Episodes & Seasons of local media"
            taskName="default-scan-for-new-episodes"
          />
          <SyncJobElement
            heading="Scan for currently trending media"
            taskName="trending-media"
          />
          <ButtonElement
            className="items-end"
            onclick={() => saveScheduledTasks()}
            disabled={false}
            buttonText="Save"
          />
        </SettingsContainer>
        <SettingsContainer title="Backend Configuration">
          <InputElement
            heading="MongoDB URL"
            placeholder="Enter MongoDB URL"
            value={backendConfig?.MONGO_URI || ""}
          />
          <InputElement
            heading="TMDB API Key"
            placeholder="Enter TMDB API Key"
            value={backendConfig?.TMDB_API_KEY || ""}
          />
          <InputElement
            heading="RabbitMQ URL"
            placeholder="Enter RabbitMQ URL"
            value={backendConfig?.RABBITMQ_URI || ""}
          />
          <InputElement
            heading="RabbitMQ Queue Name"
            placeholder="Enter RabbitMQ Queue Name"
            value={backendConfig?.RABBITMQ_QUEUE || ""}
          />
          <InputElement
            heading="Anime Directory"
            placeholder="Enter Anime Directory"
            value={backendConfig?.LOCAL_ANIME_PATH || ""}
          />
          <InputElement
            heading="Series Directory"
            placeholder="Enter Series Directory"
            value={backendConfig?.LOCAL_SERIES_PATH || ""}
          />
          <InputElement
            heading="Page Size"
            placeholder="Page Size"
            value={backendConfig?.PAGE_SIZE || 100}
          />
          <ButtonElement
            className="items-end"
            onclick={() => saveBackendConfig()}
            disabled={false}
            buttonText="Save"
          />
        </SettingsContainer>
      </div>
    </div>
  );
}
