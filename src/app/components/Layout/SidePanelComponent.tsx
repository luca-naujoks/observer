"use client";

import { IFrontendConfig } from "../../interfaces";
import { LinkButton } from "../ui/LinkButton";

export function SidePanelComponent({
  appConfig,
}: {
  appConfig: IFrontendConfig;
}) {
  return (
    <div
      id="sidepanel"
      className="fixed flex flex-col items-center h-full w-[15%] 2xl:w-[10%] border-gray-500 border-r-2 p-4"
    >
      <span id="programmName">
        <h1
          className="h-36 text-4xl font-semibold text-center text-wrap cursor-pointer"
          title={"AniStream Version " + appConfig.appVersion}
        >
          {appConfig.appName}
        </h1>
      </span>
      <div id="buttons" className="flex flex-col gap-4 px-4 w-full h-full">
        <LinkButton title="Overview" link="/" />
        <LinkButton title="Local" link="/local-overview" />
        <LinkButton title="Watchlist" link="/watchlist" />
        <LinkButton title="Anime" link="/anime-overview" />
        <LinkButton title="Series" link="/series-overview" />
        <LinkButton
          title="Settings"
          link="/settings"
          className="mt-auto mb-8"
        />
      </div>
    </div>
  );
}
