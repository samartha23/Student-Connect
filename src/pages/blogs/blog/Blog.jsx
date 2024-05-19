import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import Heading from "../../../components/texts/Headings";
import getAPIData from "../../../hooks/getAPIData";
import { Link, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Paragraph from "../../../components/texts/Paragraph";
import parseDatetime from "../../../utils/parseDatetime";
import ProfileImage from "../../../assets/profile.png";

const Blog = () => {
  const { id } = useParams();

  const { data, loading, error } = getAPIData(
    `${import.meta.env.VITE_DJANGO_API}/blogs/get/${id}`,
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Layout>
      {!loading && !error && data ? (
        <div>
          <img
            src={data?.blog.banner}
            alt={data?.blog.title}
            className="max-h-[400px] w-full rounded-xl object-cover"
          />
          <Heading level={3} classes={"mt-5 mb-1"}>
            {data?.blog.title}
          </Heading>

          <Paragraph classes={"text-xs mb-5"}>
            {parseDatetime(data?.blog.created_at).split("-")[0]}
          </Paragraph>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                className="h-8 w-8 rounded-full border"
                src={ProfileImage}
                alt="Jese Leos avatar"
              />
              <Link
                to={`/profile/${data?.blog.author?.user_name}`}
                className="block text-xs font-medium dark:text-white"
              >
                {data?.blog.author?.user_name}
              </Link>
            </div>
          </div>

          <div
            className="mt-8 dark:text-white"
            dangerouslySetInnerHTML={{ __html: data?.blog.description }}
          ></div>
        </div>
      ) : (
        <div className="flex min-h-[70vh] items-center justify-center gap-2 text-sm font-medium dark:text-gray-300">
          <FaSpinner className="h-4 w-4 animate-spin text-gray-800 dark:text-gray-300" />
          Loading...
        </div>
      )}
    </Layout>
  );
};

export default Blog;
