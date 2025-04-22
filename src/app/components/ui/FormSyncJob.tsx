import { useEffect, useState } from "react";
import { useAppConfigContext } from "../../utils/appConfigContext";

export function SyncJobElement({
  heading,
  taskName,
  width,
}: {
  heading: string;
  taskName: string;
  width?: string;
}) {
  const appConfig = useAppConfigContext();

  const [currentSchedule, setCurrentSchedule] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  async function updateJob() {
    const url = appConfig.backend_url + "/schedules";
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function runJobNow() {
    const url =
      appConfig.backend_url + "/schedules/run-task-now?taskName=" + taskName;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          appConfig.backend_url + `/schedules/task?taskName=${taskName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setValue(data.schedule);
          setCurrentSchedule(data.schedule);
        } else {
          throw new Error("Failed to fetch schedule");
        }
      } catch {
        setDisabled(true);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex flex-col mb-4 ${width ? width : "w-full"}`}
      title="Sync Job"
    >
      <h1
        className={`text-lg mb-2 ${disabled ? "text-gray-400" : "text-white"}`}
      >
        {heading}
      </h1>
      <div className="flex gap-2 ">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full bg-transparent border-2 ${
            disabled ? "border-gray-700" : "border-gray-500"
          } p-1 pl-2 text-gray-500 outline-hidden rounded-md focus:text-white`}
          disabled={disabled}
        />
        <button
          onClick={currentSchedule === value ? runJobNow : updateJob}
          className="customButton w-28"
          disabled={disabled}
        >
          {currentSchedule === value ? "Run Now" : "Save"}
        </button>
      </div>
    </div>
  );
}
