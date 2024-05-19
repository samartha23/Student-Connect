import React, { useState } from "react";
import Heading from "../texts/Headings";
import Paragraph from "../texts/Paragraph";
import { FaPeopleArrows } from "react-icons/fa";
import { CheckIcon, CircleOffIcon, IndianRupee } from "lucide-react";
import Button from "../Button";
import Tag from "../tag/Tag";
import BottomModal from "./BottomModal";
import ContributionDescription from "./ContributionDescription";

const SingleContribution = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="mb-5 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start gap-5">
        <img
          className="h-11 w-11 rounded-md"
          src="https://photos.wellfound.com/startups/i/9302650-a74c0c0f53da716ca7586db194d4e917-medium_jpg.jpg?buster=1673609646"
          alt="Jese Leos avatar"
        />
        <div>
          <Heading level={4}>How to quickly deploy a static website</Heading>
          <Paragraph classes={"my-1"}>
            Billing infrastructire for software companies
          </Paragraph>
          <span className="inline-flex items-center gap-2 rounded text-xs font-bold text-gray-500">
            <FaPeopleArrows />3 Contributors
          </span>
        </div>
      </div>
      <div className="my-3">
        <Tag
          label={"Actively Hiring"}
          icon={<CheckIcon className="h-3 w-3" />}
          spanClasses={"text-green-900 bg-green-100"}
          iconClasses={"text-green-900"}
        />
      </div>

      <div className="flex cursor-pointer justify-between rounded-md border border-gray-100 px-4 py-2 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600">
        <div className="flex items-center gap-5">
          <Heading level={6} classes={"text-sm font-semibold"}>
            Full Stack Engineer
          </Heading>

          <Tag
            label={"Paid"}
            icon={<IndianRupee className="h-3 w-3" />}
            spanClasses={"text-green-900 bg-green-100"}
            iconClasses={"text-green-900"}
          />
          <Tag
            label={"Unpaid"}
            icon={<CircleOffIcon className="h-3 w-3" />}
            spanClasses={"text-red-900 bg-red-100"}
            iconClasses={"text-red-900"}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-500">
            Posted 2 weeks ago
          </span>
          <Button
            label={"Learn more"}
            radius={"md"}
            classes={"px-2 py-[6px]"}
            onclick={() => setOpenModal(true)}
          />
        </div>
      </div>

      <BottomModal openModal={openModal} setOpenModal={setOpenModal}>
        <ContributionDescription />
      </BottomModal>
    </div>
  );
};

export default SingleContribution;
