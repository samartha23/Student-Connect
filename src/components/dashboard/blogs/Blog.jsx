import { Edit2Icon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paragraph from "../../texts/Paragraph";
import deleteAPIData from "../../../hooks/deleteAPIData";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../utils/toastsPopup";
import { deleteBlog } from "../../../features/dashboard/dashboardSlice";
import EditBlog from "./EditBlog";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const [openModal, setOpenModal] = useState(false);

  const { loading, data, error, deleteData } = deleteAPIData();

  const handleDeleteBlog = async () => {
    if (loading) {
      return;
    }

    await deleteData(
      `${import.meta.env.VITE_DJANGO_API}/blogs/delete/${blog.blog_id}/`,
      {
        Authorization: `Token ${user.token}`,
      },
    );
  };

  useEffect(() => {
    if (data) {
      dispatch(deleteBlog(blog.blog_id));
      notifySuccess("Blog deleted.");
    }
    if (error) {
      notifyError("Error while deleting blog.");
    }
  }, [data, error]);

  return (
    <article className="m-2 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 md:w-[45%] lg:w-[30%]">
      <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
        <Link to="#">{blog.title}</Link>
      </h2>
      <Paragraph classes={"mb-4 mt-2 text-xs font-semibold"}>
        10 Oct 2023
      </Paragraph>
      <div className="flex gap-2">
        <div className="cursor-pointer rounded-md bg-red-100 p-1 text-red-800 dark:bg-red-700 dark:text-red-300">
          <Trash2Icon className="h-3 w-3" onClick={handleDeleteBlog} />
        </div>
        <div className="cursor-pointer rounded-md bg-green-100 p-1 dark:bg-green-700 dark:text-green-300">
          <Edit2Icon className="h-3 w-3" onClick={() => setOpenModal(true)} />
        </div>
      </div>

      <EditBlog openModal={openModal} setOpenModal={setOpenModal} blog={blog} />
    </article>
  );
};

export default Blog;
