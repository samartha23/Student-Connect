import React, { useState } from "react";
import Sidebar from "../../../components/educator/Sidebar";
import Heading from "../../../components/texts/Headings";
import Tag from "../../../components/tag/Tag";
import { PlusIcon } from "lucide-react";
import CreateAssessment from "../../../components/educator/assessments/CreateAssessment";
import Assessment from "../../../components/educator/assessments/Assessment";

const Assessments = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Sidebar>
      <div className="text-white ">
        <div className="flex items-center justify-between">
          <Heading level={4} classes={"font-semibold"}>
            All Assessments
          </Heading>
          <button
            className="rounded-full border border-gray-500 dark:border-gray-700 dark:bg-gray-800"
            onClick={() => setOpenModal(true)}
          >
            <Tag
              icon={<PlusIcon className="text-gray-800 dark:text-white" />}
              label={"Create Assessment"}
              iconClasses={"w-4 h-4"}
              spanClasses={
                "font-medium text-white text-gray-800 dark:text-white"
              }
            />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Assessment />
      </div>

      <CreateAssessment openModal={openModal} setOpenModal={setOpenModal} />
    </Sidebar>
  );
};

export default Assessments;
