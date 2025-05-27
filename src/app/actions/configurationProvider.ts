"use server";
import * as fs from "fs";
import { IFrontendConfig } from "../interfaces";
import { unstable_noStore as noStore } from "next/cache";

const appConfigPath = "config/appConfig.json";

export async function checkConfig() {
  noStore();
  if (!fs.existsSync("config")) {
    fs.mkdirSync("config");
  }

  if (!fs.existsSync(appConfigPath)) {
    const defaultConfig: IFrontendConfig = {
      configured: false,
      backend_url: "http://localhost:3000",
      appVersion: (await getPackageProps()).version,
      appName: "AniStream",
      background_image: true,
    };

    fs.writeFileSync(appConfigPath, JSON.stringify(defaultConfig, null, 2));
  }
}

async function getPackageProps() {
  const packageJson: { name: string; version: string } = JSON.parse(
    fs.readFileSync("package.json", "utf-8")
  );

  return packageJson;
}

export async function getConfiguration(): Promise<IFrontendConfig> {
  noStore();
  // Check if the configuration file exists else create it
  await checkConfig();

  const config = JSON.parse(fs.readFileSync(appConfigPath, "utf-8"));
  return await config;
}

export async function updateConfiguration(config: IFrontendConfig) {
  noStore();
  const appVersion =
    config.appVersion.trim().length === 0
      ? (await getPackageProps()).version
      : config.appVersion;
  const name =
    config.appName.trim().length === 0 ? "AniStream" : config.appName;

  const configuration: IFrontendConfig = {
    configured: config.configured,
    backend_url: config.backend_url,
    appVersion: appVersion,
    appName: name,
    background_image: config.background_image,
  };

  await checkConfig();
  fs.writeFileSync(appConfigPath, JSON.stringify(configuration, null, 2));
}
