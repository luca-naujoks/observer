"use client";

import Form from "next/form";

import { useState } from "react";
import { FormInput } from "./Form/FormInput";
import { useRouter } from "next/navigation";
import { updateConfiguration } from "../actions/configurationProvider";
import { IBackendConfig } from "../interfaces";

interface SetupReturn {
  fieldData: {
    TmdbApiKey: string;
    AnimeDir: string;
    SeriesDir: string;
    PageSize: number;
  };
  errors: {
    TmdbApiKey: boolean;
    AnimeDir: boolean;
    SeriesDir: boolean;
    PageSize: boolean;
  };
  messages: {
    TmdbApiKey: string;
    AnimeDir: string;
    SeriesDir: string;
    PageSize: string;
  };
}

export default function SetupPage() {
  const [stage, setStage] = useState<number>(1);
  const totalStages: number = 3;
  const stageNames: string[] = [
    "Backend Connection",
    "Local Storage",
    "Providers",
  ];

  const router = useRouter();
  const [response, setResponse] = useState<SetupReturn>({} as SetupReturn);

  const [backendUrl, setBackendUrl] = useState<string>("");
  const [animeDir, setAnimeDir] = useState<string>("");
  const [seriesDir, setSeriesDir] = useState<string>("");
  const [pageSize, setPageSize] = useState<string>("");

  const [tmdbApiKey, setTmdbApiKey] = useState<string>("");

  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d](-?[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3})|" + // OR ip (v4) address
      "(localhost))" + // OR localhost
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  async function submitConfig() {
    setResponse({} as SetupReturn);
    async function setupRequest(): Promise<void> {
      const payload: IBackendConfig = {
        TmdbApiKey: tmdbApiKey,
        AnimeDir: animeDir,
        SeriesDir: seriesDir,
        PageSize: parseInt(pageSize),
      };

      const response = await fetch(backendUrl + "/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).catch((error) => {
        console.error("Network error:", error);
        setResponse({
          errors: {
            TmdbApiKey: true,
            AnimeDir: true,
            SeriesDir: true,
            PageSize: true,
          },
          messages: {
            TmdbApiKey:
              "Network error occurred. Please check your backend URL and try again.",
            AnimeDir: "",
            SeriesDir: "",
            PageSize: "",
          },
          fieldData: payload,
        } as SetupReturn);
        throw error;
      });

      switch (true) {
        case (await response).status == 201:
          await updateConfiguration({
            appName: "AniStream",
            appVersion: "1.0",
            configured: true,
            backend_url: backendUrl,
            background_image: true,
          });
          router.refresh();
          break;
        case (await response).status == 400:
          setResponse(await (await response).json());
          return;
      }
    }
    await setupRequest();
  }

  function ProgressBar() {
    return (
      <div className="mb-8 mt-2">
        <p className="text-center text-xs font-medium">
          Step {stage} of {totalStages}
        </p>

        <div
          className={`h-2 mt-1 overflow-hidden ${
            stage == 3
              ? "bg-white"
              : "bg-gradient-to-r from-white from-1% via-white/25 via-30% to-white/25 to-100%"
          } rounded-full`}
        >
          <div
            className={`h-2 rounded-full bg-white ${
              stage === 1 ? "w-1/3" : stage === 2 ? "w-2/3" : "w-full"
            }`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div
        id="ConfigContainer"
        className="w-1/3 h-fit p-4 bg-gray-300/25 rounded-md"
      >
        <div id="header" className="h-1/5">
          <h1 className="text-2xl text-center font-semibold ">
            Setup - {stageNames[stage - 1]}
          </h1>
          <ProgressBar />
        </div>

        <div id="body" className="flex h-4/5">
          <section className={stage == 1 ? "block w-full" : "hidden"}>
            <Form action={""} className="flex flex-col h-full justify-between">
              <div>
                <FormInput
                  label="Backend Url"
                  placeholder="Backend Url"
                  value={backendUrl}
                  setValue={setBackendUrl}
                />
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStage(stage - 1)} disabled>
                  Previous
                </button>
                <button
                  onClick={() => setStage(stage + 1)}
                  disabled={!urlPattern.test(backendUrl)}
                >
                  Next
                </button>
              </div>
            </Form>
          </section>
          <section className={stage == 2 ? "block w-full " : "hidden"}>
            <Form action={""} className="flex flex-col h-full justify-between">
              <div>
                <FormInput
                  label="Anime Directory"
                  value={animeDir}
                  setValue={setAnimeDir}
                  placeholder="/anime"
                  error={response?.errors?.AnimeDir}
                  errorMessage={response?.messages?.AnimeDir}
                  required
                />
                <FormInput
                  label="Series Directory"
                  value={seriesDir}
                  setValue={setSeriesDir}
                  placeholder="/series"
                  error={response?.errors?.SeriesDir}
                  errorMessage={response?.messages?.SeriesDir}
                  required
                />
                <FormInput
                  label="Page Size"
                  value={pageSize}
                  setValue={setPageSize}
                  placeholder="100"
                  error={response?.errors?.PageSize}
                  errorMessage={response?.messages?.PageSize}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStage(stage - 1)}
                  disabled={stage <= 1}
                >
                  Previous
                </button>
                <button
                  onClick={() => setStage(stage + 1)}
                  disabled={
                    !(
                      animeDir.length > 0 &&
                      seriesDir.length > 0 &&
                      pageSize.length > 0 &&
                      !isNaN(parseInt(pageSize)) &&
                      parseInt(pageSize) > 0
                    )
                  }
                >
                  Next
                </button>
              </div>
            </Form>
          </section>
          <section className={stage == 3 ? "block w-full" : "hidden"}>
            <Form action={""} className="flex flex-col h-full justify-between">
              <div>
                <FormInput
                  label="TmdbApiKey"
                  value={tmdbApiKey}
                  setValue={setTmdbApiKey}
                  placeholder="eyJhbGciOiJIUzI1NiJ9..."
                  error={response?.errors?.TmdbApiKey}
                  errorMessage={response?.messages?.TmdbApiKey}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  className=""
                  onClick={() => setStage(stage - 1)}
                  disabled={stage <= 1}
                >
                  Previous
                </button>
                <button
                  onClick={() => submitConfig()}
                  disabled={!(tmdbApiKey.length > 0)}
                >
                  Finish
                </button>
              </div>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
}
