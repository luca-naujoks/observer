import { Suspense } from "react";
import { DetailedMediaCard } from "../components/detailedMediaCard/detailedMediaCard";

export default function MediaComponent() {
  return (
    <Suspense>
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-0">
        <DetailedMediaCard />
      </div>
    </Suspense>
  );
}
