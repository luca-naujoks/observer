export function SettingsContainer({
  children,
  title,
  className,
}: {
  children?: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`${className} flex flex-col w-full h-fit mb-4 p-4 rounded-md`}
    >
      <h1 className="secondHeaddline">{title}</h1>
      {children}
    </div>
  );
}
