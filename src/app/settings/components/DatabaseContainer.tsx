import { useState, useEffect } from "react";
import { SettingsContainer } from "./SettingsContainer";
import { useAppConfigContext } from "../../utils/useAppConfigContext";

export function DatabaseContainer() {
  const appConfig = useAppConfigContext();

  const [animeCount, setAnimeCount] = useState<number>(0);
  const [seriesCount, setSeriesCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setAnimeCount(await getMediaCount({ type: "anime" }));
      setSeriesCount(await getMediaCount({ type: "series" }));
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getMediaCount({ type }: { type: string }): Promise<number> {
    const request = await fetch(
      appConfig.backend_url + "/sqlite/mediacount?type=" + type
    );

    const response = await request.json();

    if (typeof response !== "number") {
      return 0;
    } else {
      return response;
    }
  }

  return (
    <SettingsContainer title="Database" className="gap-4">
      <DatabaseInfoContainer label="Available Animes" value={animeCount} />
      <DatabaseInfoContainer label="Available Series" value={seriesCount} />
    </SettingsContainer>
  );
}

function DatabaseInfoContainer({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="w-2/3 border-gray-500 border p-2 shadow-xs shadow-gray-500 rounded-md">
      <h1 className="text-xl font-semibold">{label}</h1>
      <p>{value}</p>
    </div>
  );
}
