import React from "react";
import { twMerge } from "tailwind-merge";

function Heading({ level, children, classes, onClick }) {
  const TagName = `h${level}`;

  const tagClasses = {
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-bold",
    4: "text-xl font-bold",
    5: "text-lg font-bold",
    6: "text-base font-bold",
  };

  return (
    <TagName
      className={twMerge(
        `${tagClasses[level]} text-gray-900 dark:text-white ${classes}`,
      )}
      onClick={onClick}
    >
      {children}
    </TagName>
  );
}

export default Heading;
