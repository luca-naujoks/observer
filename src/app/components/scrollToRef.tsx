"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollContainer({
  children,
  className,
  endOfPageCallback,
}: {
  children: React.ReactNode;
  className?: string;
  endOfPageCallback?: (page: number) => Promise<boolean>; // return false if data was returned. return true if empty array was returned
}) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  // Functions regarding the end of page event
  const loadingRef = useRef(false);
  const pageRef = useRef(0);
  const endOfDataRef = useRef(false);

  const handleScrollUp = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleVisibleButton = () => {
    setShowScrollButton(window.scrollY >= 500);
  };

  const handleLeftWindowCalculation = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    if (
      scrollHeight - scrollTop <= 1500 &&
      scrollHeight > 5000 &&
      !loadingRef.current &&
      endOfPageCallback &&
      !endOfDataRef.current
    ) {
      loadingRef.current = true;
      pageRef.current += 1;
      endOfPageCallback(pageRef.current).then((isEndOfData) => {
        if (isEndOfData) {
          endOfDataRef.current = true;
        } else {
          endOfDataRef.current = false;
        }

        loadingRef.current = false;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
    if (endOfPageCallback) {
      window.addEventListener("scroll", handleLeftWindowCalculation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className} id="media-container">
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
