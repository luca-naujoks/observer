"use client";

import { useState } from "react";
import { SubNavigationElement } from "../components/ui/SubNavigationElement";
import { FrontendContainer } from "./components/FrontendContainer";
import { BackendContainer } from "./components/BackendContainer";
import { AuditContainer } from "./components/AuditContainer";
import { ScheduledTasksContainer } from "./components/ScheduledTaskContainer";
import { InfoBoxRow } from "../components/infoBox/infoBoxRow";

export default function Settings() {
  const [navigationTab, setNavigationTab] = useState<string>("Frontend");

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
        <div className="flex flex-col w-1/3 h-fit mt-[3.25rem] gap-0.5 border-gray-500 border rounded-md">
          <InfoBoxRow heading="Total Animes" value="212" />
          <InfoBoxRow heading="Animes on Watchlist" value="212" />
          <InfoBoxRow heading="Animes in local storage" value="212" />
          <InfoBoxRow heading="Total Series" value="212" />
          <InfoBoxRow heading="Series on Watchlist" value="212" />
          <InfoBoxRow heading="Series in local storage" value="212" />
        </div>
      </div>
    </div>
  );
}
