import React from "react";

const FormSelect = ({ label, options }) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
        {label}
      </label>
      <select
        className="block w-full rounded-lg border border-gray-400 p-2 text-sm text-gray-900 outline-none
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
