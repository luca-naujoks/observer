import { useState } from "react";
import { FormInput } from "../../components/Form/FormInput";
import { useAppConfigContext } from "../../utils/useAppConfigContext";
import { SettingsContainer } from "./SettingsContainer";
import { updateConfiguration } from "../../actions/configurationProvider";
import { Button } from "../../components/ui/Button";

export function FrontendContainer() {
  const appConfig = useAppConfigContext();
  const [appName, setAppName] = useState<string>(appConfig.appName);
  const [backend_url, setBackend_url] = useState<string>(appConfig.backend_url);

  async function saveFrontendConfig() {
    updateConfiguration({
      ...appConfig,
      appName: appName,
      backend_url: backend_url,
    });
  }

  return (
    <div className="flex flex-col w-2/3">
      <SettingsContainer title="Frontend Configuration">
        <FormInput
          label="App Name"
          placeholder="App Name"
          value={appName}
          setValue={setAppName}
        />
        <FormInput
          label="Backend URL"
          placeholder={"Backend URL"}
          value={backend_url}
          setValue={setBackend_url}
        />
        <Button
          className="items-end"
          onclick={() => saveFrontendConfig()}
          disabled={false}
          buttonText="Save"
        />
      </SettingsContainer>
      <SettingsContainer title="Link elements"></SettingsContainer>
    </div>
  );
}
