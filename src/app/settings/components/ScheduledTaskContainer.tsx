import { SyncJobElement } from "../../components/ui/FormSyncJob";
import { SettingsContainer } from "./SettingsContainer";
import { ButtonElement } from "./elements.component";

export function ScheduledTasksContainer() {
  async function saveScheduledTasks() {}
  return (
    <SettingsContainer title="Synchronization Jobs">
      <SyncJobElement
        heading="Scan for new media in local library"
        taskName="default-local-scanner"
        width="w-2/3"
      />
      <SyncJobElement
        heading="Scan for new Media"
        taskName="default-scan-for-new-media"
        width="w-2/3"
      />
      <SyncJobElement
        heading="Scan for new Episodes & Seasons of local media"
        taskName="default-scan-for-new-episodes"
        width="w-2/3"
      />
      <SyncJobElement
        heading="Scan for currently trending media"
        taskName="default-collect-trending-media"
        width="w-2/3"
      />
      <ButtonElement
        className="items-end"
        onclick={() => saveScheduledTasks()}
        disabled={false}
        buttonText="Save"
        width="w-2/3"
      />
    </SettingsContainer>
  );
}
