import React from "react";
import { twMerge } from "tailwind-merge";

const MCQOption = () => {
  const selectedClasses =
    "border border-green-500 dark:border-green-500 shadow-none";

  return (
    <button
      //   variant={selectedChoice === index ? "default" : "outline"}
      className={twMerge(
        `mb-4 w-full justify-start rounded-md border p-3 shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 ${selectedClasses}`,
      )}
      //   onClick={() => setSelectedChoice(index)}
    >
      <div className="flex items-center justify-start">
        <div
          className={twMerge(
            `mr-5 rounded-md border p-2 px-3 text-xs font-medium dark:border-gray-700 dark:text-gray-200 ${selectedClasses}`,
          )}
        >
          1
        </div>
        <div className="text-start text-sm font-medium dark:text-white">
          Achieving 100% uptime for applications
        </div>
      </div>
    </button>
  );
};

export default MCQOption;
