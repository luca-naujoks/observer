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
import { ISetupConfig, IScheduledTask } from "../interfaces";

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

  return (
    <div>
      <h1 className="text-headLine mb-26 ml-4">Settings</h1>
      <div className="grid grid-cols-2 w-full gap-4">
        <SettingsContainer title="Frontend Configuration">
          <InputElement
            heading="App Name"
            placeholder="App Name"
            value={appConfig.appName}
            setValue={() => console.log("test")}
          />
          <InputElement
            heading="Backend URL"
            placeholder={"Backend URL"}
            value={appConfig.backend_url}
            setValue={() => console.log("test")}
          />
          <ImageUploadElement />
          <ButtonElement
            className="items-end"
            onclick={() => console.log("Save")}
            disabled={false}
            buttonText="Save"
          />
        </SettingsContainer>
        <SettingsContainer title="Synchronization Jobs">
          <SyncJobElement
            heading="Scan for new media in local library"
            jobName="default-local-scanner"
          />
          <SyncJobElement
            heading="Scan for new online Media"
            jobName="default-scan-for-new-media"
          />
          <SyncJobElement
            heading="Scan for new Episodes & Seasons of local media"
            jobName="default-scan-for-new-episodes"
          />
          <ButtonElement
            className="items-end"
            onclick={() => console.log("Save")}
            disabled={false}
            buttonText="Save"
          />
        </SettingsContainer>
        <SettingsContainer title="Backend Configuration">
          <InputElement
            heading="MongoDB URL"
            placeholder="Enter MongoDB URL"
            value={backendConfig?.MONGO_URI || ""}
            setValue={() => console.log("test")}
          />
          <InputElement
            heading="TMDB API Key"
            placeholder="Enter TMDB API Key"
            value={backendConfig?.TMDB_API_KEY || ""}
            setValue={() => console.log("test")}
          />
          <InputElement
            heading="RabbitMQ URL"
            placeholder="Enter RabbitMQ URL"
            value={backendConfig?.RABBITMQ_URI || ""}
            setValue={() => console.log("test")}
          />
          <InputElement
            heading="RabbitMQ Queue Name"
            placeholder="Enter RabbitMQ Queue Name"
            value={backendConfig?.RABBITMQ_QUEUE || ""}
            setValue={() => console.log("test")}
          />
          <InputElement
            heading="Anime Directory"
            placeholder="Enter Anime Directory"
            value={backendConfig?.LOCAL_ANIME_PATH || ""}
            setValue={() => console.log("test")}
          />
          <InputElement
            heading="Series Directory"
            placeholder="Enter Series Directory"
            value={backendConfig?.LOCAL_SERIES_PATH || ""}
            setValue={() => console.log("test")}
          />
          <ButtonElement
            className="items-end"
            onclick={() => console.log(backendConfig)}
            disabled={false}
            buttonText="Save"
          />
        </SettingsContainer>
      </div>
    </div>
  );
}
