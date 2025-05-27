import { useFormStatus } from "react-dom";

export function SubmitButton({
  text,
  pendingText,
}: {
  text?: string;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full mt-4 customButton"
      aria-describedby={pending ? "submit-status" : undefined}
    >
      <span className="flex items-center justify-center gap-2">
        {pending && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {pending ? pendingText || "Submitting..." : text || "Submit"}
      </span>
    </button>
  );
}
