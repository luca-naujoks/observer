import { createContext, useContext } from "react";
import { IAppConfig } from "../interfaces";

export const AppConfigContext = createContext<IAppConfig | undefined>(undefined);

export function useAppConfigContext() {
    const config = useContext(AppConfigContext);

    if (!config) {
        throw new Error("useAppConfigContext must be used within a AppConfigProvidder and value");
    }

    return config;
}