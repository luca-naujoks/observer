"use client";

import { useState } from "react";
import { SubNavigationElement } from "../components/ui/SubNavigationElement";
import { FrontendContainer } from "./components/FrontendContainer";
import { BackendContainer } from "./components/BackendContainer";
import { AuditContainer } from "./components/AuditContainer";
import { DatabaseContainer } from "./components/DatabaseContainer";
import { ScheduledTasksContainer } from "./components/ScheduledTaskContainer";

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
          title="Database"
          navigationTab={navigationTab}
          setNavigationTab={setNavigationTab}
        />
        <SubNavigationElement
          title="Audit"
          navigationTab={navigationTab}
          setNavigationTab={setNavigationTab}
        />
      </div>
      <div className={navigationTab == "Frontend" ? "block" : "hidden"}>
        <FrontendContainer />
      </div>
      <div className={navigationTab == "Backend" ? "block" : "hidden"}>
        <BackendContainer />
      </div>
      <div className={navigationTab == "Scheduled Tasks" ? "block" : "hidden"}>
        <ScheduledTasksContainer />
      </div>
      <div className={navigationTab == "Database" ? "block" : "hidden"}>
        <DatabaseContainer />
      </div>
      <div className={navigationTab == "Audit" ? "block" : "hidden"}>
        <AuditContainer />
      </div>
    </div>
  );
}
