import React from "react";
import { twMerge } from "tailwind-merge";
import ThemeSwitcher from "./ThemeSwitcher";
import { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";

const Layout = ({ children, classes }) => {
  const { theme } = useSelector((store) => store.theme);

  return (
    <SkeletonTheme
      baseColor={`${theme === "dark" ? "#181f2e" : "#ebebeb"}`}
      highlightColor={`${theme === "dark" ? "#1f2937" : "#f5f5f5"}`}
    >
      <div className="min-h-[89vh] dark:bg-gray-900">
        <div
          className={twMerge(
            `mx-auto max-w-screen-xl px-5 py-10 font-montserrat transition duration-1000 ease-in-out ${classes}`,
          )}
        >
          {children}
          <ThemeSwitcher />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Layout;
