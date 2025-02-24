"use client";
import React, { useEffect, useState } from "react";

export function SearchBar({
  className,
  defaultValue,
  setSearch,
}: {
  className?: string;
  defaultValue?: string;
  setSearch: (search: string) => void;
}) {
  const searchRef = React.useRef<HTMLInputElement | null>(null);
  const [userInput, setUserInput] = useState(defaultValue || "");

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSearch(userInput);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [userInput, setSearch]);

  return (
    <div
      id="searchBar"
      className={`${className} flex h-14 w-1/2 p-2 mb-4 bg-gray-400/25 backdrop-blur-md rounded-md`}
    >
      <input
        ref={searchRef}
        type="text"
        placeholder="Search"
        className="w-full px-4 bg-transparent outline-hidden placeholder-white"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
    </div>
  );
}
