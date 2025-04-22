import { useRef, useState } from "react";
import { useAppConfigContext } from "../../utils/appConfigContext";
import { updateConfiguration } from "../../actions/configurationProvider";

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
          className={`w-full bg-transparent border-2 border-gray-500 p-1 pl-2 text-white outline-hidden rounded-md`}
          type="file"
          id="wallpaperUpload"
          accept=".jpg, .png, .webp"
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
