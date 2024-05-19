import {
  BookCopyIcon,
  FileBadge2Icon,
  LayoutDashboardIcon,
} from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Layout from "../Layout";
import Profile from "../../assets/profile.png";
import { useSelector } from "react-redux";

const navigations = [
  {
    title: "Dashboard",
    url: "/educator/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Courses",
    url: "/educator/courses",
    icon: BookCopyIcon,
  },
  {
    title: "Assessments",
    url: "/educator/assessments",
    icon: FileBadge2Icon,
  },
];

const Sidebar = ({ classes, open, children }) => {
  const { theme } = useSelector((store) => store.theme);

  return (
    <Layout classes={"mx-0 px-0 py-0 min-w-full min-h-screen flex"}>
      <div
        className={twMerge(
          `h-screen w-72 border-r pr-2 dark:border-gray-600 md:w-64 ${classes} absolute bottom-0 top-0 z-30 bg-white py-3 pl-2 transition-all duration-200 dark:bg-gray-900 md:relative md:bottom-0 md:left-0 md:top-0 ${
            open ? "left-0" : "left-[-500px]"
          }`,
        )}
      >
        <Link
          to="/"
          className="mb-5 flex h-11 w-32 items-center bg-cover bg-center"
          style={{
            backgroundImage:
              theme === "dark"
                ? "url('/studentconnect-logo-dark.svg')"
                : "url('/studentconnect-logo-light.svg')",
          }}
        ></Link>
        <ul>
          {navigations.map((navigation) => (
            <li className="mb-2" key={navigation.title}>
              <NavLink
                className={({ isActive }) =>
                  twMerge(
                    `group flex cursor-pointer select-none items-center rounded-lg p-2 text-gray-900  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 ${
                      isActive && "bg-gray-200 dark:bg-gray-700"
                    }`,
                  )
                }
                to={navigation.url}
              >
                <navigation.icon className="h-5 w-5" />
                <span className={`ml-3 text-sm`}>{navigation.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full">
        <div className="flex justify-end border-b p-3 dark:border-gray-600">
          <img
            className="h-8 w-8 cursor-pointer rounded-full border"
            src={Profile}
            alt="user photo"
          />
        </div>
        <div className="max-h-[92vh] w-full overflow-hidden overflow-y-auto p-3">
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default Sidebar;
