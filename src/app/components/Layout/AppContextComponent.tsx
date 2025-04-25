"use client";
import { IFrontendConfig } from "../../interfaces";
import { AppConfigContext } from "../../utils/useAppConfigContext";

export function AppContextComponent({
  children,
  appConfig,
}: {
  appConfig: IFrontendConfig;
  children: React.ReactNode;
}) {
  return (
    <AppConfigContext.Provider value={appConfig}>
      {children}
    </AppConfigContext.Provider>
  );
}
