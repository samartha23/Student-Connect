import React from "react";
import Linkify from "react-linkify";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Trash2Icon } from "lucide-react";
import axios from "axios";
import { deleteComment } from "../../../../features/kanban/kanbanSlice";

const Comment = ({ comment, stageIndex, taskIndex, taskId }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const handleDeleteComment = async () => {
    const res = await axios.delete(
      `${import.meta.env.VITE_NODE_API}/kanban/comment/${comment._id}`,
      {
        headers: {
          Authorization: `Bearer ${user.user_id}`,
        },
      },
    );

    dispatch(deleteComment({ stageIndex, taskIndex, _id: comment._id }));
  };

  return (
    <div className="relative my-2 flex overflow-hidden rounded-md border p-2 dark:border-gray-700">
      <img
        src={comment.user.profile_image}
        alt=""
        className="h-7 w-7 rounded-full border border-gray-300"
      />
      <div className="ml-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-500 dark:font-medium dark:text-gray-300">
            {comment.user.user_name}{" "}
            <span className="ml-2 text-xs font-medium text-gray-400">
              {formatDistanceToNow(new Date(comment.timestamp), {
                addSuffix: true,
              })}
            </span>
          </p>

          {user._id === comment.user._id && (
            <div className="absolute right-2 top-2">
              <Trash2Icon
                className="h-3 w-3 cursor-pointer text-red-700 dark:text-red-400"
                onClick={handleDeleteComment}
              />
            </div>
          )}
        </div>
        <p className="text-links mt-1 text-xs font-medium text-gray-800 dark:font-light dark:text-gray-300">
          <Linkify>{comment.text}</Linkify>
        </p>
      </div>
    </div>
  );
};

export default Comment;
