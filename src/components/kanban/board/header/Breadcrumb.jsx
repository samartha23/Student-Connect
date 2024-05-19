import { ChevronsRight } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setOpenSidebar } from "../../../../features/kanban/sidebarSlice";

const Breadcrumb = ({ toLink, toText, title }) => {
  const dispatch = useDispatch();

  return (
    <div className="mb-8 flex items-center justify-between text-sm font-normal text-gray-700 dark:text-gray-300">
      <ChevronsRight
        className="h-5 w-5 cursor-pointer text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white lg:hidden"
        onClick={() => dispatch(setOpenSidebar(true))}
      />

      <div>
        <Link to={toLink} className="hover:underline">
          {toText}
        </Link>{" "}
        {title}
      </div>
    </div>
  );
};

export default Breadcrumb;
