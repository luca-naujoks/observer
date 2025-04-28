import { PiWarningCircle } from "react-icons/pi";

export function FormErrorMessage({
  message,
  display,
}: {
  message: string;
  display: boolean;
}) {
  return (
    <div
      className={
        display
          ? "grid grid-cols-12 grid-rows-2 items-center w-full px-1 py-0.5 mb-4 text-red-600 border border-red-600 rounded-md"
          : "hidden"
      }
    >
      <PiWarningCircle className="col-span-1" />
      <h1 className="col-span-11">Error</h1>
      <p className="col-span-1" />
      <p className="col-span-11">{message}</p>
    </div>
  );
}
