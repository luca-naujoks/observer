import { Dispatch, SetStateAction } from "react";

export function TypeSwitch({
  label,
  selectedType,
  setSelectedType,
}: {
  label?: string;
  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center justify-between w-full h-20">
      <h1 className="text-headLine w-[20%]">{label}</h1>
      <p className="w-[50%] border border-gray-400" />
      <div
        id="typeSwitcher"
        className="relative flex items-center w-[20%] h-14 bg-gray-400/25 rounded-md overflow-hidden"
      >
        <div
          className={`absolute top-0 h-full w-1/2 bg-gray-900/75 rounded-md transition-transform ease-in-out duration-300 ${
            selectedType === "anime" ? "translate-x-0" : "translate-x-full"
          }`}
        />
        <button
          className="relative z-10 w-1/2 h-full cursor-pointer text-center"
          onClick={() => setSelectedType("anime")}
        >
          Anime
        </button>
        <button
          className="relative z-10 w-1/2 h-full cursor-pointer text-center"
          onClick={() => setSelectedType("serie")}
        >
          Series
        </button>
      </div>
    </div>
  );
}
