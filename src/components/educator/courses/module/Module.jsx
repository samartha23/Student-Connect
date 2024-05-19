import {
  ChevronDown,
  Edit2Icon,
  FileIcon,
  Link2Icon,
  NewspaperIcon,
  PlusIcon,
  Trash2Icon,
  YoutubeIcon,
} from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Tag from "../../../tag/Tag";
import Uploader from "./Uploader";

const materials = ["Video", "File", "Links", "Content"];

const icons = {
  file: FileIcon,
  video: YoutubeIcon,
  link: Link2Icon,
  article: NewspaperIcon,
};

const links = [
  {
    type: "file",
    title: "Type of clouds",
  },
  {
    type: "video",
    title: "How to setup AWS account?",
  },
  {
    type: "link",
    title: "Deployment models",
  },
  {
    type: "article",
    title: "Docker",
  },
];

const Module = () => {
  const [open, setOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [showContentUploader, setShowContentUploader] = useState(false);

  return (
    <div className="w-full">
      <div>
        <div
          className={twMerge(
            `flex w-full cursor-pointer items-center justify-between rounded-t-lg border p-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 ${
              open && "bg-gray-100 dark:bg-gray-800"
            }`,
          )}
        >
          <span
            className="flex w-full cursor-pointer items-center text-base dark:text-white"
            onClick={() => setOpen(!open)}
          >
            <ChevronDown className="mr-3 h-4 w-4" />
            Lesson 1
          </span>

          <span className="flex items-center dark:text-white">
            <Edit2Icon className="mr-3 h-5 w-5 rounded-md bg-green-600 p-1 text-white" />
            <Trash2Icon className="mr-3 h-5 w-5 rounded-md bg-red-600 p-1 text-white" />
          </span>
        </div>
      </div>
      <div className={twMerge(`${!open && "hidden"}`)}>
        <div className="border border-t-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-5">
            {links.map((link) => (
              <div className="mb-4 flex items-center justify-between border-b pb-2 dark:border-gray-800">
                <div className="flex text-gray-800 dark:text-gray-400">
                  {React.createElement(icons[link.type], {
                    className: "mr-2 h-3.5 w-3.5",
                  })}
                  <span className="text-xs font-medium">{link.title}</span>
                </div>

                <Trash2Icon className="h-3 w-3 cursor-pointer text-red-700" />
              </div>
            ))}
          </div>

          <button
            className="rounded-md border  text-white dark:border-gray-600 dark:bg-gray-800"
            onClick={() => setShowContentUploader(true)}
          >
            <Tag
              icon={<PlusIcon className="text-gray-700 dark:text-white" />}
              label={"Add Item"}
              iconClasses={"w-4 h-4"}
              spanClasses={"font-medium text-gray-700 dark:text-white"}
            />
          </button>

          {showContentUploader && (
            <Uploader
              materials={materials}
              selectedMaterial={selectedMaterial}
              setSelectedMaterial={setSelectedMaterial}
              setShowContentUploader={setShowContentUploader}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Module;
