"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollToTop({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleScrollUp = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleVisibleButton = () => {
    setShowScrollButton(window.scrollY >= 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  }, []);

  return (
    <div className={className}>
      <div id="scrollBackUpPoint" className="absolute -top-4" ref={targetRef} />
      {children}
      <button
        className={
          (showScrollButton ? "block" : "hidden") +
          " fixed bottom-8 right-8 bg-gray-900/75 p-2 rounded-full hover:bg-gray-900"
        }
        onClick={() => handleScrollUp()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}
