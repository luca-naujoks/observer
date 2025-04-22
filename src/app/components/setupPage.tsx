"use client";

import Form from "next/form";

import { useEffect, useState } from "react";
import { FormErrorMessage } from "./ui/FormErrorMessage";
import { FormInput } from "./ui/FormInput";
import { FormHeadLine } from "./ui/FormHeadLine";
import { SubmitButton } from "./ui/FormSubmitButton";
import { updateConfiguration } from "../actions/configurationProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

  const [backendURL, setBackendURL] = useState("");
  const [backendUrlValid, setBackendUrlValid] = useState<boolean>(false);

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
        PageSize: parseInt(pageSize),
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

  async function validateBackendUrl(): Promise<boolean> {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3})|" + // OR ip (v4) address
        "(localhost))" + // OR localhost
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (!urlPattern.test(backendURL)) {
      return false;
    }
    try {
      const response = await fetch(backendURL + "/setup/discovery");
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      setBackendUrlValid(await validateBackendUrl());
    }, 500);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backendURL]);

  return (
    <div className="fixed flex w-full h-full items-center justify-center">
      <div className="fixed inset-0 -z-50">
        <Image
          src="/assets/wallpaper"
          alt=""
          fill={true}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-950/75" />
      </div>
      <Form
        action={submitConfig}
        className={
          "flex flex-col justify-between w-1/3 h-fit p-4 bg-gray-300/25 backdrop-blur-sm rounded-md"
        }
      >
        <section className="text-white">
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
                ? "text-white"
                : "text-gray-400 placeholder:text-gray-400"
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
