"use client";

import { useState } from "react";
import { SubNavigationElement } from "../components/ui/SubNavigationElement";
import { FrontendContainer } from "./components/FrontendContainer";
import { BackendContainer } from "./components/BackendContainer";
import { AuditContainer } from "./components/AuditContainer";
import { ScheduledTasksContainer } from "./components/ScheduledTaskContainer";
import { InfoBoxRow } from "../components/infoBox/infoBoxRow";
import useSWR from "swr";
import { useAppConfigContext } from "../utils/useAppConfigContext";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Settings() {
  const appConfig = useAppConfigContext();
  const [navigationTab, setNavigationTab] = useState<string>("Frontend");
  const { data: totalAnime, isLoading: totalAnimeLoading } = useSWR(
    `${appConfig.backend_url}/telemetrics/anime`,
    fetcher
  );
  const { data: totalSeries, isLoading: totalSeriesLoading } = useSWR(
    `${appConfig.backend_url}/telemetrics/series`,
    fetcher
  );

  return (
    <div>
      <h1 className="text-headLine mb-4 ml-4">Settings</h1>
      <div id="settingsNavigation" className="flex gap-8 ml-4 mb-4">
        <SubNavigationElement
          title="Frontend"
          navigationTab={navigationTab}
          setNavigationTab={setNavigationTab}
        />
        <SubNavigationElement
          title="Backend"
          navigationTab={navigationTab}
          setNavigationTab={setNavigationTab}
        />
        <SubNavigationElement
          title="Scheduled Tasks"
          navigationTab={navigationTab}
          setNavigationTab={setNavigationTab}
        />
        <SubNavigationElement
          title="Audit"
          navigationTab={navigationTab}
          setNavigationTab={setNavigationTab}
        />
      </div>
      <div className="flex">
        {(() => {
          switch (navigationTab) {
            case "Frontend":
              return <FrontendContainer />;
            case "Backend":
              return <BackendContainer />;
            case "Scheduled Tasks":
              return <ScheduledTasksContainer />;
            case "Audit":
              return <AuditContainer />;
            default:
              return <FrontendContainer />;
          }
        })()}
        <InfoBox>
          <InfoBoxRow
            heading="Total Animes"
            value={totalAnimeLoading ? 0 : totalAnime}
          />
          <InfoBoxRow
            heading="Animes on Watchlist"
            value={totalAnimeLoading ? 0 : totalAnime}
          />
          <InfoBoxRow
            heading="Animes in local storage"
            value={totalAnimeLoading ? 0 : totalAnime}
          />
          <InfoBoxRow
            heading="Total Series"
            value={totalSeriesLoading ? 0 : totalSeries}
          />
          <InfoBoxRow
            heading="Series on Watchlist"
            value={totalSeriesLoading ? 0 : totalSeries}
          />
          <InfoBoxRow
            heading="Series in local storage"
            value={totalSeriesLoading ? 0 : totalSeries}
            className="border-b-0"
          />
        </InfoBox>
      </div>
    </div>
  );
}

function InfoBox({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-1/3 h-fit mt-[3.25rem] gap-0.5 border-gray-500 border rounded-md">
      {children}
    </div>
  );
}
