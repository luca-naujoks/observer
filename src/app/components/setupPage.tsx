"use client";

import Form from "next/form";

import { useState } from "react";
import { FormErrorMessage } from "./ui/FormErrorMessage";
import { FormInput } from "./ui/FormInput";
import { FormHeadLine } from "./ui/FormHeadLine";
import { SubmitButton } from "./ui/SubmitButton";
import { updateConfiguration } from "../actions/configurationProvider";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [response, setResponse] = useState<SetupReturn>({} as SetupReturn);
  const [stage, setStage] = useState(0);

  const [backendURL, setBackendURL] = useState("");
  const [backendUrlValid, setBackendUrlValid] = useState<boolean>(true);

  const [tmdbApiKey, setTmdbApiKey] = useState("");
  const [animeDir, setAnimeDir] = useState("");
  const [seriesDir, setSeriesDir] = useState("");
  const [pageSize, setPageSize] = useState("");

  async function submitConfig() {
    setResponse({} as SetupReturn);
    async function setupRequest(): Promise<void> {
      const payload = {
        TmdbApiKey: tmdbApiKey,
        AnimeDir: animeDir,
        SeriesDir: seriesDir,
        PageSize: pageSize,
      };

      const response = fetch(backendURL + "/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      switch (true) {
        case (await response).status == 201:
          await updateConfiguration({
            appName: "Anisquid Observer",
            appVersion: "1.0",
            configured: true,
            backend_url: backendURL,
            background_image: false,
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

  return (
    <div className="flex w-full h-full items-center justify-center">
      <Form
        action={submitConfig}
        className={
          "flex flex-col justify-between w-1/3 h-fit p-4 border border-gray-500 rounded-md"
        }
      >
        <section className="text-gray-400">
          <FormHeadLine title="Setup" />
          <h1 className="text-2xl">Frontend Configuration</h1>
          <FormInput
            label="Backend Url"
            value={backendURL}
            setValue={setBackendURL}
            placeholder="http://localhost"
            required
          />
          <section
            className={
              backendUrlValid
                ? "text-gray-400"
                : "text-gray-600 placeholder:text-gray-500"
            }
          >
            <h1 className="mt-8 text-2xl">Backend Configuration</h1>
            <FormInput
              label="TmdbApiKey"
              value={tmdbApiKey}
              setValue={setTmdbApiKey}
              placeholder="eyJhbGciOiJIUzI1NiJ9..."
              error={response?.errors?.TmdbApiKey}
              errorValue={response?.messages?.TmdbApiKey}
              defaultValue={response?.fieldData?.TmdbApiKey}
              disabled={!backendUrlValid}
              required
            />
            <FormInput
              label="Anime Directory"
              value={animeDir}
              setValue={setAnimeDir}
              placeholder="/anime"
              errorValue={response?.messages?.AnimeDir}
              defaultValue={response?.fieldData?.AnimeDir}
              disabled={!backendUrlValid}
              required
            />
            <FormInput
              label="Series Directory"
              value={seriesDir}
              setValue={setSeriesDir}
              placeholder="/series"
              errorValue={response?.messages?.SeriesDir}
              defaultValue={response?.fieldData?.SeriesDir}
              disabled={!backendUrlValid}
              required
            />
            <FormInput
              label="Page Size"
              value={pageSize}
              setValue={setPageSize}
              placeholder="100"
              errorValue={response?.messages?.PageSize}
              defaultValue={response?.fieldData?.PageSize}
              disabled={!backendUrlValid}
              required
            />
          </section>
          <FormErrorMessage
            display={
              response?.errors?.TmdbApiKey ||
              response?.errors?.AnimeDir ||
              response?.errors?.SeriesDir ||
              response?.errors?.PageSize
            }
            message="Please Fix the corresponding errors"
          />
        </section>
        <SubmitButton text="Complete Setup" pendingText="Completing Setup..." />
      </Form>
    </div>
  );
}
