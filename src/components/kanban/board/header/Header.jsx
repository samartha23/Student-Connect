import React, { useState } from "react";
import { Github, Link2Icon, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import AddContributors from "./AddContributors";
import { useSelector } from "react-redux";
import ToolTip from "../../shared/ToolTip";
import { notifySuccess } from "../../../../utils/toastsPopup";
import Breadcrumb from "./Breadcrumb";
import Filters from "./Filters";

const Header = () => {
  const { details } = useSelector((store) => store.kanban);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Breadcrumb
        toLink={"/kanban"}
        toText={"Projects"}
        title={`/ ${details?.name} / Board`}
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl">
            {details?.name}
          </div>
          <Link2Icon
            className="h-6 w-6 cursor-pointer rounded-md bg-gray-200 p-1 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
            onClick={() => {
              navigator.clipboard.writeText(
                `${import.meta.env.VITE_ROOT_URL}/kanban/${details._id}`,
              );

              notifySuccess("Link copied");
            }}
          />
          <Link to={details?.projectUrl} target="_blank">
            <Github className="h-6 w-6 cursor-pointer rounded-md bg-gray-200 p-1 text-gray-800 dark:bg-gray-800 dark:text-gray-100" />
          </Link>
        </div>
        <div className="flex gap-5">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setOpenModal(true)}
          >
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Invite
            </span>
            <PlusIcon className="h-5 w-5 cursor-pointer rounded-md bg-gray-200 p-[3px] text-gray-900 dark:bg-gray-500 dark:text-gray-50" />
          </div>
          <div className="flex">
            {details?.members?.map((member) => (
              <ToolTip
                key={member._id}
                children={
                  <Link to="#" className="-ml-2">
                    <img
                      src={member.profile_image}
                      className="h-8 w-8 rounded-full border-[1px] border-gray-300 dark:border-gray-600"
                    />
                  </Link>
                }
                message={member.user_name}
              />
            ))}
          </div>
        </div>
      </div>

      <AddContributors openModal={openModal} setOpenModal={setOpenModal} />

      <Filters />
    </div>
  );
};

export default Header;
