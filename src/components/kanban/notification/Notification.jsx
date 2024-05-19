import React from "react";
import { formatDistanceToNow } from "date-fns";
import {
  ClipboardListIcon,
  MailIcon,
  MailOpenIcon,
  Trash2Icon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  deleteNotification,
  updateNotificationStatus,
} from "../../../features/kanban/kanbanSlice";

const Notification = ({ notification }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { details } = useSelector((store) => store.kanban);

  const handleUpdateStatus = async (_id, status) => {
    const res = await axios.put(
      `${import.meta.env.VITE_NODE_API}/kanban/notification/${_id}`,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.user_id}`,
        },
      },
    );

    dispatch(updateNotificationStatus({ id: res.data._id, status: status }));
  };

  const handleDeleteNotification = async (_id) => {
    await axios.delete(
      `${import.meta.env.VITE_NODE_API}/kanban/notification/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${user.user_id}`,
        },
      },
    );

    dispatch(deleteNotification(_id));
  };

  return (
    <div
      className="mb-3 flex w-full items-start gap-3 rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-none dark:bg-gray-800"
      key={notification._id}
    >
      <button
        onClick={() =>
          handleUpdateStatus(notification._id, !notification.status)
        }
      >
        {notification.status ? (
          <MailIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        ) : (
          <MailOpenIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
        )}
      </button>
      <div className="w-full">
        <p className="mb-1 flex justify-between text-xs font-medium text-gray-900 dark:text-gray-300">
          <span className="rounded-md bg-gray-200 px-[4px] py-[3px] dark:bg-gray-700 ">
            {notification.from}
          </span>

          <Trash2Icon
            className="h-3 w-3 cursor-pointer text-red-500"
            onClick={() => handleDeleteNotification(notification._id)}
          />
        </p>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            {notification.message}
          </p>
          <Link
            to={`${import.meta.env.VITE_ROOT_URL}/kanban/${
              details?._id
            }?taskId=${notification.task}`}
            target="_blank"
            className="flex"
          >
            <ClipboardListIcon className="h-4 w-4 text-blue-500" />
          </Link>
        </div>
        <p className="mt-1 text-xs font-medium text-gray-700 dark:text-gray-400">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default Notification;
