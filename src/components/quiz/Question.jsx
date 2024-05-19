import React from "react";

const Question = () => {
  return (
    <div className="mt-5 flex items-center rounded-xl border  p-5  shadow dark:border-gray-800 dark:bg-gray-800">
      <div className="w-fit">
        <div className="mr-5 divide-y divide-zinc-600/50 text-center text-sm font-medium dark:text-white">
          <div>1</div>
          <div className="text-slate-400 dark:text-slate-100">10</div>
        </div>
      </div>
      <div className="flex flex-grow font-medium dark:text-gray-200">
        What is the main goal of DevOps?
      </div>
    </div>
  );
};

export default Question;
