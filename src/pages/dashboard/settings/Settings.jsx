import React from "react";
import {
  Contact2Icon,
  FigmaIcon,
  InstagramIcon,
  Link2Icon,
  LinkedinIcon,
  TwitterIcon,
  UserCircleIcon,
  YoutubeIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import FormInput from "../../../components/form/FormInput";
import FormTextarea from "../../../components/form/FormTextarea";
import { FaProductHunt } from "react-icons/fa";
import Dashboard from "../Dashboard";
import Paragraph from "../../../components/texts/Paragraph";
import Button from "../../../components/Button";

const Settings = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <Dashboard>
      <div>
        <div className="mb-9">
          <Seperator icon={UserCircleIcon} text={"Basic Profile"} />
          <div>
            <FormInput
              label="Full Name"
              type="text"
              required={true}
              value={user.full_name}
            />
            <FormTextarea label={"Brief Bio"} placeholder={"Write here..."} />
          </div>
        </div>
        <div className="mb-9">
          <Seperator icon={Link2Icon} text={"Social Links"} />
          <Paragraph classes={"text-gray-900 text-xs font-medium mb-3"}>
            Note: You only need to only add your username.
          </Paragraph>
          <div className="flex w-full flex-1 gap-3 ">
            <div className="flex-1">
              <FormInput
                type="text"
                placeholder={"twitter.com/"}
                leftIcon={
                  <TwitterIcon className="h-4 w-4 text-gray-500 dark:text-gray-200" />
                }
              />
            </div>
            <div className="flex-1">
              <FormInput
                type="text"
                placeholder={"instagram.com/"}
                leftIcon={
                  <InstagramIcon className="h-4 w-4 text-gray-500 dark:text-gray-200" />
                }
              />
            </div>
            <div className="flex-1">
              <FormInput
                type="text"
                placeholder={"linkedin.com/in/"}
                leftIcon={
                  <LinkedinIcon className="h-4 w-4 text-gray-500 dark:text-gray-200" />
                }
              />
            </div>
          </div>
          <div className="flex w-full flex-1 gap-3">
            <div className="flex-1">
              <FormInput
                type="text"
                placeholder={"youtube.com/"}
                leftIcon={
                  <YoutubeIcon className="h-4 w-4 text-gray-500 dark:text-gray-200" />
                }
              />
            </div>
            <div className="flex-1">
              <FormInput
                type="text"
                placeholder={"figma.com/@"}
                leftIcon={
                  <FigmaIcon className="h-4 w-4 text-gray-500 dark:text-gray-200" />
                }
              />
            </div>
            <div className="flex-1">
              <FormInput
                type="text"
                placeholder={"producthunt.com/@"}
                leftIcon={
                  <FaProductHunt className="h-4 w-4 text-gray-500 dark:text-gray-200" />
                }
              />
            </div>
          </div>
        </div>
        <div>
          <Seperator icon={Contact2Icon} text={"Contact Info"} />
          <div>
            <FormInput
              label="Mobile Number"
              type="text"
              placeholder={"Mobile Number"}
            />
          </div>
        </div>
        <Button
          label={"Save"}
          radius={"md"}
          classes={
            "px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 focus:ring-green-300 dark:focus:ring-none"
          }
        />
      </div>
    </Dashboard>
  );
};

const Seperator = ({ icon, text, classes }) => {
  const IconName = icon;

  return (
    <div className="mb-5 flex items-center gap-2">
      <div className="h-[0.1px] flex-1 bg-gray-300 dark:bg-gray-600"></div>
      <div className="mx-4 flex items-center gap-2 ">
        <IconName
          className={twMerge(
            `h-4 w-4 text-gray-800 dark:text-gray-300 ${classes}`,
          )}
        />{" "}
        <span className="text-xs font-semibold uppercase dark:text-gray-300">
          {text}
        </span>
      </div>
      <div className="h-[0.1px] flex-1 bg-gray-300 dark:bg-gray-600"></div>
    </div>
  );
};

export default Settings;
