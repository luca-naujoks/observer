export function FormHeadLine({ title }: { title: string }) {
  return (
    <h1 className="flex w-full mb-4 text-4xl font-semibold justify-center">
      {title}
    </h1>
  );
}
