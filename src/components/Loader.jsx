import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-sm font-medium dark:text-gray-300">
      <FaSpinner className="h-4 w-4 animate-spin text-gray-800 dark:text-gray-300" />
      Loading...
    </div>
  );
};

export default Loader;
