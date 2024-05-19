import React from "react";
import { FaArrowRight, FaLaptop, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Heading from "../texts/Headings";
import Paragraph from "../texts/Paragraph";
import parseDatetime from "../../utils/parseDatetime";

const SingleArticle = ({ blog }) => {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <Heading level={6} classes={"mb-1"}>
        {blog.title}
      </Heading>
      <span className="mb-2 block text-[12px] font-normal text-gray-500 dark:text-gray-200">
        {parseDatetime(blog.created_at).split("-")[0]}
      </span>
      <Paragraph classes={"mb-5 text-xs"}>
        {blog.description.replace(/<[^>]+>/g, "").length > 200
          ? blog.description.replace(/<[^>]+>/g, "").slice(0, 200) + "..."
          : blog.description.replace(/<[^>]+>/g, "")}
      </Paragraph>
      <div className="flex items-center justify-between">
        <Link
          to={`/profile/${blog.author.user_name}`}
          className="flex items-center space-x-3"
        >
          <img
            className="h-7 w-7 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt="Jese Leos avatar"
          />
          <span className="block text-xs font-medium dark:text-white">
            {blog.author?.user_name}
          </span>
        </Link>
        <Link
          to={`/blogs/${blog.blog_id}`}
          className="text-primary-600 inline-flex items-center gap-2 text-xs font-medium hover:underline dark:text-white"
        >
          Read more
          <FaArrowRight className="w-2" />
        </Link>
      </div>
    </article>
  );
};

export default SingleArticle;
