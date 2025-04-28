export function Button({
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
