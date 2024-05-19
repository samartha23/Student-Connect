import React, { useState } from "react";
import Sidebar from "../../../components/educator/Sidebar";
import Heading from "../../../components/texts/Headings";
import { PlusIcon } from "lucide-react";
import Tag from "../../../components/tag/Tag";
import CreateCourseModule from "../../../components/educator/courses/CreateCourseModule";
import Module from "../../../components/educator/courses/module/Module";

const Courses = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Sidebar>
      <div className="text-white ">
        <div className="flex items-center justify-between">
          <Heading level={4} classes={"font-semibold"}>
            Courses / Cloud Computing
          </Heading>
          <button
            className="rounded-full border bg-gray-500 dark:border-gray-600 dark:bg-gray-800"
            onClick={() => setOpenModal(true)}
          >
            <Tag
              icon={<PlusIcon />}
              label={"Add Module"}
              iconClasses={"w-4 h-4"}
              spanClasses={"font-medium"}
            />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Module />
      </div>

      <CreateCourseModule openModal={openModal} setOpenModal={setOpenModal} />
    </Sidebar>
  );
};

export default Courses;
