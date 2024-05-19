import { LightbulbIcon, VerifiedIcon } from "lucide-react";
import React from "react";
import Paragraph from "../../../texts/Paragraph";
import Project from "./Project";

const ProfileProject = () => {
  return (
    <div className="mt-14 border-t pt-10 dark:border-gray-800 ">
      <div className="mb-4 flex items-center gap-3">
        <div className="relative w-fit">
          <LightbulbIcon className="h-8 w-8 dark:text-gray-100" />
          <VerifiedIcon className="absolute bottom-[0px] right-[-4px] h-4 w-4 fill-green-600 text-white dark:text-gray-900" />
        </div>
        <Paragraph
          classes={"font-semibold text-gray-900 text-base dark:text-gray-100"}
        >
          My Projects
        </Paragraph>
      </div>

      <div className="mt-2 flex flex-wrap">
        <Project />
        <Project />
        <Project />
        <Project />
      </div>
    </div>
  );
};

export default ProfileProject;
