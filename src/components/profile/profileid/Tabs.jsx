import React, { useState } from "react";
import Heading from "../../texts/Headings";

const Tabs = ({ titles, tabs }) => {
  const [active, setActive] = useState(titles[0]);

  return (
    <div className="mt-10 border-t dark:border-gray-700">
      <div className="flex gap-10 border-b pt-3 dark:border-gray-700">
        {titles.map((title) => (
          <Heading
            level={6}
            classes={`font-semibold text-sm px-5 pb-3 cursor-pointer text-gray-700 dark:text-gray-500 ${
              active === title &&
              "text-black border-b-2 border-gray-800 dark:border-gray-400 dark:text-gray-200"
            }`}
            onClick={() => setActive(title)}
          >
            {title}
          </Heading>
        ))}
      </div>
      <div className="px-2 py-5 md:p-5">{tabs[active]}</div>
    </div>
  );
};

export default Tabs;
