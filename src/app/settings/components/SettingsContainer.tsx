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
      className={`${className} flex flex-col w-full h-[36rem] mb-4 bg-gray-300/25 backdrop-blur-sm p-4 rounded-md`}
    >
      <h1 className="secondHeaddline">{title}</h1>
      {children}
    </div>
  );
}
