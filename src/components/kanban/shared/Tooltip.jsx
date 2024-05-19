import React, { useState } from "react";

const ToolTip = ({ children, message }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="group relative flex flex-col items-center">
      <span
        className="flex justify-center"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
      <div
        className={`absolute bottom-full flex flex-col items-center  whitespace-nowrap group-hover:flex ${
          !show ? "hidden" : null
        }`}
      >
        <span className="whitespace-no-wrap relative z-10 rounded-md bg-gray-600 p-2 text-xs leading-none text-white shadow-lg">
          {message}
        </span>
        <div className="-mt-2 h-3 w-3 rotate-45 bg-gray-600" />
      </div>
    </div>
  );
};

export default ToolTip;
