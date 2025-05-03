import { useState } from "react";
import { FormInput } from "../../components/ui/FormInput";
import { useAppConfigContext } from "../../utils/useAppConfigContext";
import { SettingsContainer } from "./SettingsContainer";
import { updateConfiguration } from "../../actions/configurationProvider";
import { ImageUploadElement } from "../../components/ui/FormImageUpload";
import { Button } from "../../components/ui/Button";

export function FrontendContainer() {
  const appConfig = useAppConfigContext();
  const [appName, setAppName] = useState<string>(appConfig.appName);
  const [backend_url, setBackend_url] = useState<string>(appConfig.backend_url);

  async function saveFrontendConfig() {
    updateConfiguration({
      ...appConfig,
      appName: appConfig.appName,
      backend_url:
        document.getElementById("Backend URL")?.getAttribute("value") ||
        appConfig.backend_url,
    });
  }

  return (
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
      <ImageUploadElement />
      <Button
        className="items-end"
        onclick={() => saveFrontendConfig()}
        disabled={false}
        buttonText="Save"
      />
    </SettingsContainer>
  );
}
