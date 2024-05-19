import React, { useState } from "react";
import Layout from "../../components/Layout";
import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  LightbulbIcon,
  PenBoxIcon,
  UserCircle2Icon,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { twMerge } from "tailwind-merge";

const navigations = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: UserCircle2Icon,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: LightbulbIcon,
  },
  {
    title: "Blogs",
    url: "/dashboard/blogs",
    icon: PenBoxIcon,
  },
];

const Dashboard = ({ children }) => {
  const [open, setOpen] = useState(false);

  if (open) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  return (
    <Layout classes={"relative p-0 md:p-5"}>
      <div className="relative flex">
        <Sidebar navigations={navigations} open={open} />
        <div className="w-full p-5 md:p-0">
          <div
            className={twMerge(
              `absolute bottom-0 left-0 right-0 top-0 z-20 cursor-pointer bg-gray-700 opacity-40 dark:bg-gray-600 ${
                open ? "sm:block" : "hidden"
              }`,
            )}
            onClick={() => setOpen(false)}
          ></div>

          {children}
        </div>

        <div>
          {open ? (
            <ChevronLeftCircleIcon
              className="absolute right-1 top-1 z-20 block h-7 w-7 rounded-full bg-gray-600 p-1 text-white md:hidden"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <ChevronRightCircleIcon
              className="absolute right-1 top-1 z-20 block h-7 w-7 rounded-full bg-gray-600 p-1 text-white md:hidden"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
