"use client";

import { useRouter } from "next/navigation";
import { BorderContainer } from "../utils/borderContainer";
import { useEffect, useState } from "react";
import TextInputField from "./InputTextField.component";
import { ISetupConfig } from "../interfaces";
import { updateConfiguration } from "../actions/configurationProvider";

interface InputFieldState {
  value: string;
  validated: boolean | undefined; // undefined = not validated, true = validated, false = invalid
}

const defaultInputFieldState: InputFieldState = {
  value: "",
  validated: undefined,
};

export default function SetupPage() {
  const router = useRouter();

  const [disableNext, setDisableNext] = useState<boolean>(true);

  const [backendURL, setBackendURL] = useState<InputFieldState>(
    defaultInputFieldState
  );
  const [mongodbURL, setMongodbURL] = useState<InputFieldState>(
    defaultInputFieldState
  );
  const [rabbitmqURL, setRabbitmqURL] = useState<InputFieldState>(
    defaultInputFieldState
  );
  const [rabbitmqQueue, setRabbitmqQueue] = useState<InputFieldState>(
    defaultInputFieldState
  );
  const [tmdbApiKey, setTmdbApiKey] = useState<InputFieldState>(
    defaultInputFieldState
  );
  const [localAnimeDir, setLocalAnimeDir] = useState<InputFieldState>(
    defaultInputFieldState
  );
  const [localSeriesDir, setLocalSeriesDir] = useState<InputFieldState>(
    defaultInputFieldState
  );

  useEffect(() => {
    if (
      backendURL.validated &&
      mongodbURL.validated &&
      rabbitmqURL.validated &&
      rabbitmqQueue.validated &&
      tmdbApiKey.validated &&
      localAnimeDir.validated &&
      localSeriesDir.validated
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [
    backendURL.validated,
    mongodbURL.validated,
    rabbitmqURL.validated,
    rabbitmqQueue.validated,
    tmdbApiKey.validated,
    localAnimeDir.validated,
    localSeriesDir.validated,
  ]);

  function handleCompleteSetup() {
    const config: ISetupConfig = {
      CONFIGURED: true,
      MONGO_URI: mongodbURL.value,
      RABBITMQ_URI: rabbitmqURL.value,
      RABBITMQ_QUEUE: rabbitmqQueue.value,
      TMDB_API_KEY: tmdbApiKey.value,
      LOCAL_ANIME_PATH: localAnimeDir.value,
      LOCAL_SERIES_PATH: localSeriesDir.value,
      PAGE_SIZE: 100,
    };

    fetch(`${backendURL.value}/setup/configure`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    })
      .then((res) => {
        if (res.ok) {
          updateConfiguration({
            background_image: false,
            appName: "",
            appVersion: "",
            configured: true,
            backend_url: backendURL.value,
          });
          setTimeout(() => {
            router.refresh();
          }, 1000);
        } else {
          throw new Error("Failed to configure backend");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="w-full h-full bg-[url('/assets/setupWallpaper.jpg')] bg-cover bg-center">
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-900/75">
        <BorderContainer className="w-1/3 h-3/6" opacity={75}>
          <div className="flex flex-col gap-2 p-4">
            <h1 className="text-3xl font-bold text-center text-gray-300 mb-8">
              Setup Page
            </h1>

            <h2 className="secondHeaddline">Frontend Configuration</h2>
            <TextInputField
              id="backendUrl"
              placeholder="Enter Backend URL"
              className="mb-8 "
              value={backendURL}
              setValue={setBackendURL}
              backendURL={backendURL.value}
            />

            <h2
              className={
                backendURL.value.length === 0
                  ? "disabledSecondHeaddline"
                  : "secondHeaddline"
              }
            >
              Backend Configuration
            </h2>
            <TextInputField
              id="mongodbURL"
              placeholder="Enter MongoDB URI"
              value={mongodbURL}
              setValue={setMongodbURL}
              backendURL={backendURL.value}
              disabled={backendURL.value.length === 0}
            />
            <TextInputField
              id="rabbitmqURL"
              placeholder="Enter RabbitMQ URI"
              value={rabbitmqURL}
              setValue={setRabbitmqURL}
              backendURL={backendURL.value}
              disabled={backendURL.value.length === 0}
            />
            <TextInputField
              id="rabbitmqQueue"
              placeholder="Enter Rabbit Queue Name"
              value={rabbitmqQueue}
              setValue={setRabbitmqQueue}
              backendURL={backendURL.value}
              disabled={backendURL.value.length === 0}
            />
            <TextInputField
              id="tmdbApiKey"
              placeholder="Enter TMDB API KEY"
              value={tmdbApiKey}
              setValue={setTmdbApiKey}
              backendURL={backendURL.value}
              disabled={backendURL.value.length === 0}
            />
            <TextInputField
              id="localAnimeDir"
              placeholder="Enter Anime Directory"
              value={localAnimeDir}
              setValue={setLocalAnimeDir}
              backendURL={backendURL.value}
              disabled={backendURL.value.length === 0}
            />
            <TextInputField
              id="localSeriesDir"
              placeholder="Enter Series Directory"
              value={localSeriesDir}
              setValue={setLocalSeriesDir}
              backendURL={backendURL.value}
              disabled={backendURL.value.length === 0}
            />
          </div>
          <div className="flex flex-1 justify-end items-end w-full">
            <button
              className="customButton mx-4 my-2"
              disabled={disableNext}
              onClick={handleCompleteSetup}
            >
              Complete
            </button>
          </div>
        </BorderContainer>
      </div>
    </div>
  );
}
