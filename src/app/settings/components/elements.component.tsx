import { useEffect, useRef, useState } from "react";
import { useAppConfigContext } from "../../utils/appConfigContext";
import { updateConfiguration } from "../../actions/configurationProvider";

export function ButtonElement({
  onclick,
  className,
  disabled,
  buttonText,
}: {
  onclick: () => void;
  className?: string;
  disabled?: boolean;
  buttonText: string;
}) {
  return (
    <div className={`flex flex-col gap-2 w-full h-full ${className}`}>
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

export function InputElement({
  heading,
  className,
  disabled,
  placeholder,
  value,
  setValue,
}: {
  heading: string;
  className?: string;
  disabled?: boolean;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className={`flex flex-col text-gray-500 mb-4 ${className}`}>
      <h1 className="text-lg mb-2">{heading}</h1>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="inputField"
      />
    </div>
  );
}

export function SyncJobElement({
  heading,
  className,
  jobName,
}: {
  heading: string;
  className?: string;
  jobName: string;
}) {
  const appConfig = useAppConfigContext();

  const [currentSchedule, setCurrentSchedule] = useState<string>("");
  const [value, setValue] = useState<string>("");

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
      appConfig.backend_url + "/schedules/run-task-now?jobName=" + jobName;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    fetch(appConfig.backend_url + `/schedules/task?jobName=${jobName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setValue(data.schedule);
          setCurrentSchedule(data.schedule);
        });
      } else {
        console.error("Failed to fetch scheduled tasks");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`flex flex-col mb-4 ${className}`} title="Sync Job">
      <h1 className="text-lg mb-2 text-gray-500">{heading}</h1>
      <div className="flex gap-2 ">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="inputField"
        />
        <button
          onClick={currentSchedule === value ? runJobNow : updateJob}
          className="customButton w-24"
        >
          {currentSchedule === value ? "Run Now" : "Save"}
        </button>
      </div>
    </div>
  );
}

export function ImageUploadElement({ className }: { className?: string }) {
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
    <div className={`flex gap-4 mb-4 ${className}`}>
      <input
        ref={uploadInput}
        className="inputField"
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
  );
}

export function SettingsContainer({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col w-4/5 mb-12 bg-gray-500/12 p-4 rounded-md">
      <h1 className="secondHeaddline">{title}</h1>
      {children}
    </div>
  );
}
