import React from "react";
import Paragraph from "../../../texts/Paragraph";
import Heading from "../../../texts/Headings";

const Project = () => {
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
      </div>
      <img
        src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="profile"
        className="mt-4 h-6 w-6 rounded-full object-cover"
      />
    </div>
  );
};

export default Project;
