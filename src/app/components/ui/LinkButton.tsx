import { usePathname, useRouter } from "next/navigation";

export function LinkButton({
  title,
  link,
  className,
}: {
  title: string;
  link: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <button
      className={`${className} ${
        usePathname() === link
          ? " p-1 bg-gray-300/25 rounded-sm"
          : " p-1 cursor-pointer"
      }`}
      onClick={() => router.push(link)}
    >
      <h1 className="text-2xl">{title}</h1>
    </button>
  );
}
