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
import { IBackendConfig } from "../interfaces";
import { updateConfiguration } from "../actions/configurationProvider";

export default function Settings() {
  const appConfig = useAppConfigContext();
  const [backendConfig, setBackendConfig] = useState<
    IBackendConfig | undefined
  >(undefined);
  const [navigationTab, setNavigationTab] = useState<string>("Frontend");

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
      <div id="settingsNavigation" className="flex gap-8 ml-4">
        <NavigationElement
          title="Frontend"
          navigationTab={navigationTab}
          setNavigationTab={setNavigationTab}
        />
        <NavigationElement
          title="Backend"
          navigationTab={navigationTab}
          setNavigationTab={setNavigationTab}
        />
        <NavigationElement
          title="Scheduled Tasks"
          navigationTab={navigationTab}
          setNavigationTab={setNavigationTab}
        />
        <NavigationElement
          title="Audit"
          navigationTab={navigationTab}
          setNavigationTab={setNavigationTab}
        />
      </div>
      <div className={navigationTab == "Frontend" ? "block" : "hidden"}>
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
      </div>
      <div className={navigationTab == "Backend" ? "block" : "hidden"}>
        <SettingsContainer title="Backend Configuration">
          <InputElement
            heading="TMDB API Key"
            placeholder="Enter TMDB API Key"
            value={backendConfig?.TmdbApiKey || ""}
          />
          <InputElement
            heading="Anime Directory"
            placeholder="Enter Anime Directory"
            value={backendConfig?.AnimeDir || ""}
          />
          <InputElement
            heading="Series Directory"
            placeholder="Enter Series Directory"
            value={backendConfig?.SeriesDir || ""}
          />
          <InputElement
            heading="Page Size"
            placeholder="Page Size"
            value={backendConfig?.PageSize || 100}
          />
          <ButtonElement
            className="items-end"
            onclick={() => saveBackendConfig()}
            disabled={false}
            buttonText="Save"
          />
        </SettingsContainer>
      </div>
      <div className={navigationTab == "Scheduled Tasks" ? "block" : "hidden"}>
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
      </div>
      <div className={navigationTab == "Audit" ? "block" : "hidden"}></div>
    </div>
  );
}

function NavigationElement({
  title,
  navigationTab,
  setNavigationTab,
}: {
  title: string;
  navigationTab: string;
  setNavigationTab: (tab: string) => void;
}) {
  return (
    <button
      className={`${
        navigationTab == title
          ? "font-semibold border-b cursor-default"
          : "cursor-pointer"
      }`}
      onClick={() => setNavigationTab(title)}
    >
      {title}
    </button>
  );
}
