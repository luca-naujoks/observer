"use client";

import useSWR from "swr";
import { IProvider } from "../../interfaces";
import { useAppConfigContext } from "../../utils/useAppConfigContext";
import { useEffect, useState } from "react";
import Form from "next/form";
import { FormInput } from "../../components/Form/FormInput";
import { useSearchParams } from "next/navigation";

export function ProviderContainer() {
  const appConfig = useAppConfigContext();
  const searchParams = useSearchParams();

  function openProvider(provider: IProvider | null) {
    switch (provider) {
      case null:
        setSelectedProvider(null);
        setProviderPopup(!providerPopup);
        break;
      default:
        setSelectedProvider(provider);
        setProviderPopup(!providerPopup);
    }
  }

  const fetcher = async (url: string): Promise<IProvider[]> => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    return response.json();
  };
  const { data: providers, isLoading } = useSWR(
    `${appConfig.backend_url}/provider`,
    fetcher
  );

  const [providerPopup, setProviderPopup] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<IProvider | null>(
    null
  );

  useEffect(() => {
    if (!providers) return;
    const getParams = (key: string) => {
      return searchParams.get(key);
    };

    const providerState = getParams("provider");

    function getProvider(name: string): IProvider | undefined {
      return providers?.find((p) => p.name === name);
    }

    switch (providerState) {
      case null:
        break;
      case "new":
        setSelectedProvider(null);
        setProviderPopup(true);
        break;
      default:
        const provider = getProvider(providerState);
        if (!provider) {
          break;
        }
        setSelectedProvider(provider);
        setProviderPopup(true);
    }
  }, [providers, searchParams]);

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-8 mr-8 w-2/3">
      {selectedProvider ? (
        <ProviderPopup
          provider={selectedProvider}
          enabled={providerPopup}
          providerPopupToggle={openProvider}
        />
      ) : (
        <AddProviderPopup
          providerPopupToggle={openProvider}
          enabled={providerPopup}
        />
      )}
      {!isLoading && providers
        ? providers.map((provider) => (
            <ProviderCard
              key={provider.name}
              provider={provider}
              providerPopupToggle={openProvider}
            />
          ))
        : ""}
      <AddProviderCard providerPopupToggle={openProvider} />
    </div>
  );
}

function ProviderCard({
  provider,
  providerPopupToggle,
}: {
  provider: IProvider;
  providerPopupToggle: (provider: IProvider) => void;
}) {
  const splitFilePath = provider.file_path.split("/");
  const fileName = splitFilePath[splitFilePath.length - 1];

  return (
    <div
      className="flex flex-col gap-2 bg-white/25 hover:bg-white/15 p-4 mb-4 rounded-md cursor-pointer"
      onClick={() => providerPopupToggle(provider)}
    >
      <h2 className="text-xl">{fileName}</h2>
      <h1 className="text-3xl">{provider.name}</h1>
      <p>{provider.schedule}</p>
      <p>{provider.enabled ? "enabled" : "disabled"}</p>
    </div>
  );
}

function AddProviderCard({
  providerPopupToggle,
}: {
  providerPopupToggle: (provider: IProvider | null) => void;
}) {
  return (
    <div
      className="flex justify-center items-center bg-white/25 hover:bg-white/15 p-4 mb-4 rounded-md cursor-pointer"
      onClick={() => providerPopupToggle(null)}
    >
      <svg
        className="text-white cursor-pointer"
        width="128"
        height="128"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </div>
  );
}

function ProviderPopup({
  provider,
  providerPopupToggle,
  enabled,
}: {
  provider: IProvider;
  providerPopupToggle: (provider: IProvider | null) => void;
  enabled: boolean;
}) {
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("");
  const [providerEnabled, setProviderEnabled] = useState<boolean>(false);

  function deleteProvider() {
    if (!deleteConfirmed) {
      setDeleteConfirmed(true);
      return;
    }
    setDeleteConfirmed(false);
    // TODO: Implement actual delete API call
    // After successful deletion:
    providerPopupToggle(null);
  }

  useEffect(() => {
    if (!provider.name || !provider.schedule) {
      return;
    }
    setName(provider.name);
    setSchedule(provider.schedule);
    setProviderEnabled(provider.enabled);
  }, [provider]);

  return (
    <div
      className={
        enabled
          ? "absolute  top-0 left-0 w-screen h-screen bg-black/50"
          : "hidden"
      }
      onClick={() => providerPopupToggle(null)}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="w-1/4 bg-white/25 p-4 rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-headLine text-center">Edit Provider</h1>
          <Form action={""} className="flex flex-col h-full justify-between">
            <FormInput
              label="Provider Name"
              placeholder="example provider"
              value={name}
              setValue={setName}
              disabled
            />
            <FormInput
              label="Provider Schedule"
              placeholder="* * * * *"
              value={schedule}
              setValue={setSchedule}
              disabled
            />
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                name="Enabled"
                checked={providerEnabled}
                onChange={() => setProviderEnabled(!providerEnabled)}
                id=""
                className="px-2 py-1 mr-2 bg-transparent outline-hidden border-2 border-gray-400 rounded-md accent-gray-400 disabled:border-gray-500 disabled:text-gray-500"
              />
              <p className="">Enabled</p>
            </label>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => deleteProvider()}
                className="w-full py-1 px-2 bg-gray-300/25 hover:bg-red-400/25 hover:text-red-950 hover:font-semibold rounded-sm cursor-pointer"
              >
                Delete
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

function AddProviderPopup({
  providerPopupToggle,
  enabled,
}: {
  providerPopupToggle: (provider: IProvider | null) => void;
  enabled: boolean;
}) {
  const [name, setName] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("");
  const [showVariables, setShowVariables] = useState<boolean>(false);

  function saveProvider() {
    return;
  }

  return (
    <div
      className={
        enabled
          ? "absolute  top-0 left-0 w-screen h-screen bg-black/50"
          : "hidden"
      }
      onClick={() => providerPopupToggle(null)}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="w-1/4 bg-white/25 p-4 rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-headLine text-center">Add Provider</h1>
          <h2 className="text-red-500 text-sm">
            Warning Providers are currently running inside the Application Core
            and can harm your Application
          </h2>
          <Form action={""} className="flex flex-col h-full justify-between">
            <FormInput
              label="Provider Name"
              placeholder="example-provider"
              value={name}
              setValue={setName}
            />
            <FormInput
              label="Provider Schedule"
              placeholder="example-provider"
              value={schedule}
              setValue={setSchedule}
            />
            <section id="variablesCollapsable" className="mt-4">
              <div
                className="flex w-full cursor-pointer"
                onClick={() => setShowVariables(!showVariables)}
              >
                <h1 className="mb-2">Variables</h1>
              </div>
            </section>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => saveProvider()}
                className="customButton w-full"
              >
                Add Provider
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
