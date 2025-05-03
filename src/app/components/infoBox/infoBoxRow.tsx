export function InfoBoxRow({
  heading,
  value,
  className,
}: {
  heading: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div
      className={
        className + " descriptionCardRow border-gray-500 border-b rounded-t-md"
      }
    >
      <h1>{heading}</h1>
      <span>{value}</span>
    </div>
  );
}
