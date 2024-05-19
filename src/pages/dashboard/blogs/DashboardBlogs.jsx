import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import Blog from "../../../components/dashboard/blogs/Blog";
import getAPIData from "../../../hooks/getAPIData";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { setBlogs } from "../../../features/dashboard/dashboardSlice";
import Skeleton from "react-loading-skeleton";

const DashboardBlogs = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { blogs } = useSelector((store) => store.dashboard);

  const { data, loading, error } = getAPIData(
    `${import.meta.env.VITE_DJANGO_API}/blogs/user-blogs/`,
    {
      headers: {
        Authorization: `Token ${user?.token}`,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error) {
      dispatch(setBlogs(data.blogs));
    }
  }, [data, loading, error]);

  return (
    <Dashboard>
      <div className="flex flex-wrap">
        {loading ? (
          <BlogLoadingSkeleton count={3} />
        ) : !blogs || blogs?.length <= 0 ? (
          <div className="flex items-center justify-center gap-2 text-sm font-medium dark:text-gray-300">
            No Blogs
          </div>
        ) : (
          blogs && blogs.map((blog) => <Blog key={blog.blog_id} blog={blog} />)
        )}
      </div>
    </Dashboard>
  );
};

export default DashboardBlogs;

const BlogLoadingSkeleton = ({ count }) => {
  return Array(count)
    .fill(0)
    .map((item, index) => (
      <article className="m-2 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 md:w-[45%] lg:w-[30%]">
        <Skeleton />
        <Skeleton width={100} height={12} />
        <div className="flex items-center gap-2">
          <Skeleton height={25} width={25} circle={true} />
          <Skeleton height={25} width={25} circle={true} />
        </div>
      </article>
    ));
};
