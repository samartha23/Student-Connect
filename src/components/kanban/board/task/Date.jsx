import React from "react";
import { FaClock } from "react-icons/fa";
import calculateDaysLeft from "../../../../utils/calculateDaysLeft";
import { twMerge } from "tailwind-merge";

const DateLabel = ({ dueDate, monthNames }) => {
  const daysLeft = calculateDaysLeft(dueDate);
  const date = new Date(dueDate).getDate();
  const month = monthNames[new Date(dueDate).getMonth()];

  return (
    <div
      className={twMerge(
        `flex items-center justify-center gap-2 rounded-lg bg-purple-200 p-1 px-2 ${
          daysLeft < 0 ? "bg-red-200" : "bg-green-300"
        }`,
      )}
    >
      <FaClock
        className={twMerge(
          `h-3 w-3 text-purple-800 ${
            daysLeft < 0 ? "text-red-800" : "text-green-900"
          }`,
        )}
      />
      <span
        className={twMerge(
          `select-none text-xs font-semibold text-purple-800 ${
            daysLeft < 0 ? "text-red-800" : "text-green-900"
          }`,
        )}
      >
        {daysLeft < 0 ? `${date} ${month}` : `${date} ${month}`}
      </span>
    </div>
  );
};

export default DateLabel;
