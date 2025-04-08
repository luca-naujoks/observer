"use client";

import { useRouter } from "next/navigation";
import { BorderContainer } from "../utils/borderContainer";
import { useEffect, useState } from "react";
import TextInputField from "./InputTextField.component";
import { IBackendConfig } from "../interfaces";
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
    tmdbApiKey.validated,
    localAnimeDir.validated,
    localSeriesDir.validated,
  ]);

  function handleCompleteSetup() {
    const config: IBackendConfig = {
      TmdbApiKey: tmdbApiKey.value,
      AnimeDir: localAnimeDir.value,
      SeriesDir: localSeriesDir.value,
      PageSize: 100,
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
