import React from "react";
import Heading from "../../texts/Headings";
import Paragraph from "../../texts/Paragraph";
import Button from "../../Button";
import { Link } from "react-router-dom";

const Course = () => {
  return (
    <div className="w-[30%] rounded-lg border border-gray-200 bg-white p-3 pb-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <img
        src="https://www.srishticampus.com/packageImages/reactt-dark_1200x628.png"
        alt="cover-image"
        className="mb-3 rounded-xl"
      />
      <Heading level={6} classes={"font-semibold mb-1"}>
        ReactJS
      </Heading>
      <Paragraph classes={"mb-3"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure earum
        voluptates quae vitae debitis, fuga dolore ducimus ab magni eum beatae,
        adipisci hic tempore!
      </Paragraph>

      <Link
        to={`/educator/courses/b2d7997a-74ca-11ee-b962-0242ac120002/module`}
        className="text-xs font-medium text-blue-700 underline dark:text-blue-400"
      >
        Manage Course
      </Link>
    </div>
  );
};

export default Course;
