import React from "react";
import Heading from "../texts/Headings";
import Paragraph from "../texts/Paragraph";
import Tag from "../tag/Tag";
import { Link } from "react-router-dom";
import { GithubIcon, Globe2Icon } from "lucide-react";
import Form from "../form/Form";
import FormTextarea from "../form/FormTextarea";
import Button from "../Button";

const ContributionDescription = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Heading level={4}>How to quickly deploy a static website</Heading>
        <Paragraph classes={"text-base mb-3"}>
          Billing infrastructire for software companies
        </Paragraph>
        <Heading level={3}>Full Stack Engineer</Heading>
      </div>
      <div className="mt-10 flex flex-col gap-7 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="mb-3">
            <Heading level={6} classes={"mb-2"}>
              Skills
            </Heading>
            <div className="flex flex-wrap gap-3">
              <Tag
                label={"Software Engineering"}
                spanClasses={"text-gray-900 bg-gray-100"}
              />
              <Tag
                label={"Full Stack Development"}
                spanClasses={"text-gray-900 bg-gray-100"}
              />
              <Tag
                label={"Developer"}
                spanClasses={"text-gray-900 bg-gray-100"}
              />
              <Tag label={"MERN"} spanClasses={"text-gray-900 bg-gray-100"} />
            </div>
          </div>

          <div className="mb-3">
            <Heading level={6} classes={"mb-2"}>
              About this role
            </Heading>
            <Paragraph>
              We're building our founding team and are looking for a full stack
              developer who can take ownership of one stream of product
              development. Your primary roles and responsibilities will evolve
              over time as the team grows.
            </Paragraph>
          </div>

          <LinkWithIcon
            label={"Website"}
            icon={<Globe2Icon className="h-4 w-4" />}
            link={"www.website.com"}
          />

          <LinkWithIcon
            label={"Github"}
            icon={<GithubIcon className="h-4 w-4" />}
            link={"www.website.com"}
          />
        </div>
        <div className="h-fit w-full rounded-2xl border border-gray-500 sm:mb-7 lg:w-1/3">
          <div className="flex items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-5">
            <Heading level={6} classes={"text-white font-semibold"}>
              Apply to Zenskar
            </Heading>
          </div>
          <div className="p-5">
            <FormTextarea
              label={"What interests you about working for this project?"}
              placeholder={"Write here..."}
            />
            <Button label={"Apply"} radius={"md"} />
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkWithIcon = ({ label, icon, link }) => {
  return (
    <div className="mb-3">
      <Heading level={6} classes={"flex gap-2 items-center mb-2"}>
        {label} {icon}
      </Heading>
      <Link to={link}>
        <Paragraph>{link}</Paragraph>
      </Link>
    </div>
  );
};

export default ContributionDescription;
