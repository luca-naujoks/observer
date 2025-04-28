import { createContext, useContext } from "react";
import { IFrontendConfig } from "../interfaces";

export const AppConfigContext = createContext<IFrontendConfig | undefined>(
  undefined
);

export function useAppConfigContext() {
  const config = useContext(AppConfigContext);

  if (!config) {
    throw new Error(
      "useAppConfigContext must be used within a AppConfigProvidder and value"
    );
  }

  return config;
}
