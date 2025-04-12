import { useEffect, useRef, useState } from "react";
import { useAppConfigContext } from "../../utils/appConfigContext";
import { updateConfiguration } from "../../actions/configurationProvider";

export function ButtonElement({
  onclick,
  className,
  disabled,
  buttonText,
  width,
}: {
  onclick: () => void;
  className?: string;
  disabled?: boolean;
  buttonText: string;
  width?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-2 h-full ${
        width ? width : "w-full"
      } ${className}`}
    >
      <button
        disabled={disabled}
        onClick={onclick}
        className={"customButton w-fit mt-auto"}
      >
        {buttonText}
      </button>
    </div>
  );
}

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
            disabled ? "border-gray-400" : "border-white"
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

export function ImageUploadElement({ width }: { width?: string }) {
  const appConfig = useAppConfigContext();

  const [uploadOrRemove, setUploadOrRemove] = useState("Remove");
  const [file, setFile] = useState<File | null>(null);
  const uploadInput = useRef<HTMLInputElement>(null);

  async function handleImageChange(e: HTMLInputElement) {
    if (e.files) {
      setFile(e.files.item(0));
      setUploadOrRemove("Upload");
    }
  }

  async function handleImageUpload() {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/assets", {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      const layout = document.getElementById("body");
      layout?.style.setProperty(
        "background-image",
        `url('/assets/wallpaper.jpg?${new Date().getTime()}')`
      );
      setFile(null);
      setUploadOrRemove("Remove");
      const newConfig = { ...appConfig, background_image: true };

      updateConfiguration(newConfig);
      if (uploadInput.current) {
        uploadInput.current.value = "";
      }
    } else {
      console.error("Error uploading image");
    }
  }

  async function handleImageRemove() {
    const layout = document.getElementById("body");
    layout?.style.removeProperty("background-image");

    const newConfig = { ...appConfig, background_image: false };

    updateConfiguration(newConfig);
  }

  return (
    <div className={`flex flex-col mb-4 ${width ? width : "w-full"}`}>
      <h1 className="text-lg text-white mb-2">Wallpaper Upload</h1>
      <div className="flex gap-4">
        <input
          ref={uploadInput}
          className={`w-full bg-transparent border-2 border-white p-1 pl-2 text-white outline-hidden rounded-md`}
          type="file"
          id="wallpaperUpload"
          accept=".jpg, .png"
          onChange={(e) => handleImageChange(e.target)}
        />
        <button
          className={`customButton w-24`}
          disabled={file == null && !appConfig.background_image}
          onClick={
            uploadOrRemove == "Upload" ? handleImageUpload : handleImageRemove
          }
        >
          {uploadOrRemove == "Upload" ? "Upload" : "Remove"}
        </button>
      </div>
    </div>
  );
}
