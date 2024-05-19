import React, { useState } from "react";
import Modal from "../../modal/Modal";
import {
  ArrowRightIcon,
  FileText,
  GoalIcon,
  Link2Icon,
  MessageSquare,
  PlusIcon,
} from "lucide-react";
import ToolTip from "../../shared/ToolTip";
import { Link, useParams } from "react-router-dom";
import FormTextarea from "../../../form/FormTextarea";
import Linkify from "react-linkify";
import Button from "../../../Button";
import Comment from "./Comment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  moveTask,
  updateTask,
} from "../../../../features/kanban/kanbanSlice";
import { notifySuccess } from "../../../../utils/toastsPopup";

const FullTask = ({ openModal, setOpenModal, task, stageIndex, taskIndex }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { stages } = useSelector((store) => store.kanban);
  const { details } = useSelector((store) => store.kanban);

  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    const res = await axios.put(
      `${import.meta.env.VITE_NODE_API}/kanban/comment/${task._id}`,
      {
        message: comment,
        commented_at: new Date(),
        projectId: details._id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.user_id}`,
        },
      },
    );

    dispatch(
      addComment({ stageIndex, taskIndex, comment: res.data.comments.pop() }),
    );

    setComment("");
  };

  const handleJoinTask = async () => {
    const alreadyExist = task?.assignedTo?.some(
      (assigned) => assigned._id === user._id,
    );

    if (!alreadyExist) {
      let contributorsIds = [];
      task?.assignedTo?.map((assigned) => contributorsIds.push(assigned._id));
      contributorsIds.push(user._id);

      const res = await axios.put(
        `${import.meta.env.VITE_NODE_API}/kanban/task/${task._id}`,
        {
          assignedTo: contributorsIds,
        },
        {
          headers: {
            Authorization: `Bearer ${user.user_id}`,
          },
        },
      );

      dispatch(
        updateTask({
          stageIndex,
          taskIndex,
          task: res.data,
        }),
      );
    }
  };

  const handleMoveTask = async (destinationStageId) => {
    const res = await axios.put(
      `${import.meta.env.VITE_NODE_API}/kanban/move-task/${task._id}`,
      {
        destinationStage: destinationStageId,
      },
      {
        headers: {
          Authorization: `Bearer ${user.user_id}`,
        },
      },
    );

    dispatch(
      moveTask({
        source: { index: taskIndex, droppableId: stages[stageIndex]._id },
        destination: { index: 0, droppableId: destinationStageId },
      }),
    );
  };

  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={task.title}
      children={
        <div>
          <div>
            <div className="mb-2 flex justify-between">
              <div className="flex gap-1 text-sm dark:text-gray-300">
                Added by{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-500">
                  {task.addedBy.user_name}
                </span>
              </div>
              <div className="flex" onClick={handleJoinTask}>
                <div className="mr-4 flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 px-1 text-xs font-semibold text-gray-600 dark:border-gray-400 dark:text-gray-400">
                  <PlusIcon className="h-3 w-3 dark:text-gray-400" /> Join
                </div>
                <div className="flex">
                  {task?.assignedTo?.map((assigned) => (
                    <ToolTip
                      key={assigned._id}
                      children={
                        <Link to="#" className="-ml-2">
                          <img
                            src={assigned.profile_image}
                            className="h-7 w-7 rounded-full border-[1px] border-gray-300 dark:border-gray-600"
                          />
                        </Link>
                      }
                      message={assigned.user_name}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div
              className="mb-4 mr-4 flex w-fit cursor-pointer items-center gap-1 rounded-md border border-gray-300 p-1 text-xs font-semibold text-gray-600 dark:border-gray-400 dark:text-gray-400"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${import.meta.env.VITE_ROOT_URL}/kanban/${id}?taskId=${
                    task._id
                  }`,
                );

                notifySuccess("Link copied.");
              }}
            >
              <Link2Icon className="h-3 w-3 dark:text-gray-400" /> Share
            </div>
            <div>
              <div className="flex items-center gap-2">
                <GoalIcon className="h-4 w-4 text-gray-800 dark:text-gray-300" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                  Actions
                </span>
              </div>
              <div className="mb-5 ml-5 mt-2">
                {stages?.map((stage) => (
                  <div
                    className="my-1 flex cursor-pointer items-center gap-1 text-xs text-gray-800 hover:underline dark:text-gray-300"
                    key={stage._id}
                    onClick={() => handleMoveTask(stage._id)}
                  >
                    <span>Move to </span>
                    <span>{stage.title}</span>
                    <ArrowRightIcon className="h-3 w-3 " />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-800 dark:text-gray-300" />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                Description
              </span>
            </div>
            <div className="text-links mb-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <Linkify>{task.description}</Linkify>
            </div>
            <div>
              <div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-800 dark:text-gray-300" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                    Comments
                  </span>
                </div>

                <FormTextarea
                  label=""
                  placeholder="Write a comment..."
                  type="text"
                  required={true}
                  value={comment}
                  onChange={(text) => {
                    setComment(text);
                  }}
                />
                <Button
                  label={"Post a comment"}
                  radius={"lg"}
                  leftIcon={<MessageSquare className="h-3 w-3" />}
                  classes={"p-2 text-xs mb-2"}
                  onclick={handleAddComment}
                />

                {task.comments
                  .slice()
                  .reverse()
                  .map((comment, index) => (
                    <Comment
                      key={index}
                      comment={comment}
                      stageIndex={stageIndex}
                      taskIndex={taskIndex}
                      taskId={task._id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default FullTask;
