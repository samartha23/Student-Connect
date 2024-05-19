import React from "react";
import Heading from "../../texts/Headings";
import Paragraph from "../../texts/Paragraph";
import { Link } from "react-router-dom";
import { BookOpenCheckIcon } from "lucide-react";

const Assessment = () => {
  return (
    <div className="w-[30%] rounded-lg border border-gray-200 bg-white p-3 pb-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <Heading level={6} classes={"font-semibold mb-2"}>
        ReactJS
      </Heading>
      <Paragraph classes={"mb-1 flex items-center gap-2 font-semibold"}>
        <BookOpenCheckIcon className="h-4 w-4" />
        Quiz
      </Paragraph>

      {/* Redirect based on exam type quiz/ coding */}
      <Link
        to={`/educator/assessments/b2d7997a-74ca-11ee-b962-0242ac120002/quiz`}
        className="text-xs font-medium text-blue-700 underline dark:text-blue-400"
      >
        Manage Assessment
      </Link>
    </div>
  );
};

export default Assessment;
