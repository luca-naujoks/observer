export function SubNavigationElement({
  title,
  navigationTab,
  setNavigationTab,
}: {
  title: string;
  navigationTab: string;
  setNavigationTab: (tab: string) => void;
}) {
  return (
    <button
      className={`${
        navigationTab == title
          ? "font-semibold border-b cursor-default"
          : "cursor-pointer"
      }`}
      onClick={() => setNavigationTab(title)}
    >
      {title}
    </button>
  );
}
