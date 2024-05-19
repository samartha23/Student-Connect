import React from "react";
import { twMerge } from "tailwind-merge";

const Paragraph = ({ children, classes }) => {
  return (
    <p
      className={twMerge(`text-sm text-gray-500 dark:text-gray-400 ${classes}`)}
    >
      {children}
    </p>
  );
};

export default Paragraph;
