"use client";
import { useRouter, usePathname } from "next/navigation";
import "../globals.css";
import { AppConfigContext } from "../utils/appConfigContext";
import { IFrontendConfig } from "../interfaces";

export default function ClientLayout({
  children,
  appConfig,
}: Readonly<{
  children: React.ReactNode;
  appConfig: IFrontendConfig;
}>) {
  const router = useRouter();

  function LinkButton({
    title,
    link,
    className,
  }: {
    title: string;
    link: string;
    className?: string;
  }) {
    return (
      <button
        className={`${className} ${
          usePathname() === link
            ? " p-1 bg-gray-300/25 rounded-sm"
            : " p-1 cursor-pointer"
        }`}
        onClick={() => router.push(link)}
      >
        <h1 className="text-2xl">{title}</h1>
      </button>
    );
  }

  return (
    <div className="flex w-screen h-screen">
      <div
        id="sidepanel"
        className="fixed flex flex-col items-center h-full w-[15%] 2xl:w-[10%] border-gray-500 border-r-2 p-4"
      >
        <span id="programmName">
          <h1
            className="h-36 text-4xl font-semibold text-center text-wrap cursor-pointer"
            title={"AniSquid Observer Version " + appConfig.appVersion}
            onClick={() => router.push("/")}
          >
            {appConfig.appName}
          </h1>
        </span>
        <div id="buttons" className="flex flex-col gap-4 px-4 w-full h-full">
          <LinkButton title="Overview" link="/" />
          <LinkButton title="Local" link="/local-overview" />
          <LinkButton title="Anime" link="/anime-overview" />
          <LinkButton title="Series" link="/series-overview" />
          <LinkButton
            title="Settings"
            link="/settings"
            className="mt-auto mb-8"
          />
        </div>
      </div>
      <div className="w-[15%] 2xl:w-[10%]" />
      <div className="w-[85%] 2xl:w-[90%] p-4 [&::-webkit-scrollbar]:w-0">
        <AppConfigContext.Provider value={appConfig}>
          {children}
        </AppConfigContext.Provider>
      </div>
    </div>
  );
}
