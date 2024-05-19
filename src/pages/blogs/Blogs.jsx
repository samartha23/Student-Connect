import React, { useEffect, useState } from "react";
import SingleArticle from "../../components/blogs/SingleArticle";
import Layout from "../../components/Layout";
import getAPIData from "../../hooks/getAPIData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaSpinner } from "react-icons/fa";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);

  const { data, loading, error } = getAPIData(
    `${import.meta.env.VITE_DJANGO_API}/blogs/get/`,
  );

  useEffect(() => {
    if (!loading && !error) {
      console.log(data);
      setBlogs(data.blogs);
    }
  }, [data, loading, error]);

  return (
    <Layout>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Blogs
            </h2>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Static ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              sint neque quisquam nam est! Porro odit iusto voluptas ut
              voluptatem!
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {loading && <BlogLoadingSkeleton count={2} />}
            {blogs?.map((blog) => (
              <SingleArticle key={blog.blog_id} blog={blog} />
            ))}
          </div>
        </div>

        <nav aria-label="page navigation" className="flex justify-center ">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <a
                href="#"
                className="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </Layout>
  );
};

export default Blogs;

const BlogLoadingSkeleton = ({ count }) => {
  return Array(count)
    .fill(0)
    .map((item, index) => (
      <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <Skeleton />
        <Skeleton width={100} height={12} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <div className="flex items-center gap-5">
          <Skeleton height={30} width={30} circle={true} />
          <Skeleton height={12} width={100} />
        </div>
      </article>
    ));
};
