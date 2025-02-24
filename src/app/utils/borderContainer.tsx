export function BorderContainer({children, className, opacity}: {children?: React.ReactNode, className?: string, opacity?: number}) {
  return (
    <div className={`bg-gray-900/${opacity || 100} border-gray-500 border-2 p-0.5 rounded-md ${className}`}>
      <div className="flex flex-col w-full h-full p-1 pb-2 px-1.5 rounded-md">
        {children}
      </div>
    </div>
  );

}