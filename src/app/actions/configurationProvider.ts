"use server";
import * as fs from "fs";
import { IAppConfig } from "../interfaces";

export async function checkConfig() {
  if (!fs.existsSync("config")) {
    fs.mkdirSync("config");
  }

  if (!fs.existsSync("config/settings.json")) {
    const defaultConfig: IAppConfig = {
      configured: false,
      backend_url: "http://localhost:3000",
      appVersion: (await getPackageProps()).version,
      appName: "AniSquid Observer",
      background_image: false,
    };

    fs.writeFileSync(
      "config/settings.json",
      JSON.stringify(defaultConfig, null, 2)
    );
  }
}

async function getPackageProps() {
  const packageJson: { name: string; version: string } = JSON.parse(
    fs.readFileSync("package.json", "utf-8")
  );

  return packageJson;
}

export async function getConfiguration(): Promise<IAppConfig> {
  // Check if the configuration file exists else create it
  await checkConfig();

  const config = JSON.parse(fs.readFileSync("config/settings.json", "utf-8"));
  return await config;
}

export async function updateConfiguration(config: IAppConfig) {
  const appVersion =
    config.appVersion.trim().length === 0
      ? (await getPackageProps()).version
      : config.appVersion;
  const name =
    config.appName.trim().length === 0 ? "AniSquid Observer" : config.appName;

  const configuration: IAppConfig = {
    configured: config.configured,
    backend_url: config.backend_url,
    appVersion: appVersion,
    appName: name,
    background_image: config.background_image,
  };

  await checkConfig();
  fs.writeFileSync(
    "config/settings.json",
    JSON.stringify(configuration, null, 2)
  );
}
