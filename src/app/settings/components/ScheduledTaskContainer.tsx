import { Button } from "../../components/ui/Button";
import { SyncJobElement } from "../../components/ui/FormSyncJob";
import { SettingsContainer } from "./SettingsContainer";

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
        taskName="general-media-scan"
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
      <Button
        className="items-end"
        onclick={() => saveScheduledTasks()}
        disabled={false}
        buttonText="Save"
        width="w-2/3"
      />
    </SettingsContainer>
  );
}
