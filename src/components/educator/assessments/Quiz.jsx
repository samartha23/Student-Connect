import { CheckCircle, Edit2Icon, Trash2Icon } from "lucide-react";
import React from "react";

const Quiz = () => {
  return (
    <div className="mt-5 rounded-md border p-5 dark:border-gray-700">
      <div>
        <p className="mb-3 flex items-start justify-between text-base font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
          When does the winter begins?
          <div className="flex gap-2">
            <Edit2Icon className="h-4 w-4 cursor-pointer border-b border-gray-700 pb-[2px] dark:border-gray-200" />
            <Trash2Icon className="h-4 w-4 cursor-pointer border-b border-red-700 pb-[2px] text-red-600 " />
          </div>
        </p>

        <span className="mb-2 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
          Options:
        </span>

        <ul>
          <li className="mb-1 ml-3 flex items-center gap-2 text-xs font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
            <span className="h-2 w-2 rounded-full bg-gray-800 dark:bg-gray-400"></span>
            November
          </li>
          <li className="mb-1 ml-3 flex items-center gap-2 text-xs font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
            <span className="h-2 w-2 rounded-full bg-gray-800 dark:bg-gray-400"></span>
            December
            <CheckCircle className="h-4 w-4 rounded-sm bg-green-300 p-[2px] dark:bg-green-700" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
