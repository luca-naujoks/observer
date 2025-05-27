import { PiWarningCircle } from "react-icons/pi";

export function FormErrorMessage({
  message,
  display,
}: {
  message: string;
  display: boolean;
}) {
  if (!display) {
    return null;
  }

  return (
    <div
      className="flex items-start gap-2 w-full px-3 py-2 mb-4 text-red-600 border border-red-600 rounded-md"
      role="alert"
      aria-live="polite"
    >
      <PiWarningCircle className="flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <span className="font-medium block">Error</span>
        <span className="block">{message}</span>
      </div>
    </div>
  );
}
