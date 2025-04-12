import { useState } from "react";
import { FormInput } from "../../components/ui/FormInput";
import { useAppConfigContext } from "../../utils/appConfigContext";
import { SettingsContainer } from "./SettingsContainer";
import { ButtonElement, ImageUploadElement } from "./elements.component";
import { updateConfiguration } from "../../actions/configurationProvider";

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
        width="w-2/3"
      />
      <FormInput
        label="Backend URL"
        placeholder={"Backend URL"}
        value={backend_url}
        setValue={setBackend_url}
        width="w-2/3"
      />
      <ImageUploadElement width="w-2/3" />
      <ButtonElement
        className="items-end"
        onclick={() => saveFrontendConfig()}
        disabled={false}
        buttonText="Save"
        width="w-2/3"
      />
    </SettingsContainer>
  );
}
