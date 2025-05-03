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
      />
      <SyncJobElement
        heading="Scan for new Media"
        taskName="general-media-scan"
      />
      <SyncJobElement
        heading="Scan for new Episodes & Seasons of local media"
        taskName="default-scan-for-new-episodes"
      />
      <SyncJobElement
        heading="Scan for currently trending media"
        taskName="default-collect-trending-media"
      />
      <Button
        className="items-end"
        onclick={() => saveScheduledTasks()}
        disabled={false}
        buttonText="Save"
      />
    </SettingsContainer>
  );
}
