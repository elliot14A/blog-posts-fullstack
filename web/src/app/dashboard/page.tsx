"use client";

import { useState } from "react";

const Page = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = ["All", "Crypto", "Finance", "Gaming", "Programming"];
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
  };
  return (
    <div className="flex space-x-3 md:space-x-0">
      <div className="flex-1 w-full max-w-sm mx-auto">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-black focus:ring-black focus:border-black"
            placeholder="Search..."
          />
          <button className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-5.2-5.2m-.8-.8c2.6-2.6 2.6-6.9 0-9.5s-6.9-2.6-9.5 0-2.6 6.9 0 9.5 6.9 2.6 9.5 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-5">
        <select
          value={selectedTag || "All"}
          onChange={(e) => handleTagChange(e.target.value)}
          className="bg-white focus:ring-black rounded-md focus:border-black appearance-none"
        >
          {tags.map((tag) => (
            <option key={tag} value={tag === "All" ? "" : tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Page;
