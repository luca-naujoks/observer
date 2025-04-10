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
    >
      {pending ? pendingText || "Submitting..." : text || "Submit"}
    </button>
  );
}
