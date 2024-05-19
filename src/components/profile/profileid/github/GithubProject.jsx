import React from "react";
import Heading from "../../../texts/Headings";
import Paragraph from "../../../texts/Paragraph";
import { StarIcon } from "lucide-react";
import techstacks from "../../../../utils/stackLogos";

// image link for github project: https://opengraph.githubassets.com/1/dhananjaykuber/studentconnect

const GithubProject = () => {
  return (
    <div className="mx-0 my-2 flex w-[100%] gap-2 rounded-md border p-3 dark:border-gray-600 md:m-2 md:w-[48%]">
      <div>
        <Heading level={6} classes={"mb-2"}>
          heackathon-starter
        </Heading>
        <Paragraph>
          A complete study plan for studying to become a machine learining
          engineer
        </Paragraph>

        <div className="mt-3 flex gap-4">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <img
              src={techstacks["python"]}
              alt="python"
              className="h-5 w-5 object-cover"
            />
            Python
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <StarIcon className="h-4 w-4 " /> <span>1</span>
          </div>
        </div>
      </div>
      <img
        src="https://opengraph.githubassets.com/1/dhananjaykuber/studentconnect"
        alt="image"
        className="h-20 w-36 rounded-md border"
      />
    </div>
  );
};

export default GithubProject;
