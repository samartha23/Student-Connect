import React from "react";
import { twMerge } from "tailwind-merge";

const Tag = ({ icon, label, spanClasses, iconClasses }) => {
  return (
    <span
      className={twMerge(
        `flex w-fit items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${spanClasses}`,
      )}
    >
      {icon && (
        <div
          className={twMerge(
            `flex items-center justify-center rounded-full p-[2px] text-white ${iconClasses}`,
          )}
        >
          {icon}
        </div>
      )}
      {label}
    </span>
  );
};

export default Tag;
