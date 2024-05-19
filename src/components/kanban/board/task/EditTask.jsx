import React, { useState } from "react";
import Modal from "../../modal/Modal";
import FormInput from "../../../form/FormInput";
import Button from "../../../Button";
import FormTextarea from "../../../form/FormTextarea";
import AssignedToDropdown from "../dropdowns/AssignedToDropdown";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  updateTask,
} from "../../../../features/kanban/kanbanSlice";

const EditTask = ({ openModal, setOpenModal, stageIndex, task, taskIndex }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { details } = useSelector((store) => store.kanban);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [contributors, setContributors] = useState(task.assignedTo);
  const [dueDate, setDueDate] = useState(task?.dueDate?.slice(0, 10));

  const handleUpdateTask = async () => {
    let contributorsIds = [];
    contributors?.map((contributor) =>
      contributorsIds.push(contributor.user_id),
    );

    const res = await axios.put(
      `${import.meta.env.VITE_NODE_API}/kanban/task/${task._id}`,
      {
        title: title,
        description: description,
        assignedTo: contributorsIds,
        projectId: details._id,
        dueDate,
      },
      {
        headers: {
          Authorization: `Bearer ${user.user_id}`,
        },
      },
    );

    dispatch(updateTask({ stageIndex, taskIndex, task: res.data }));

    setOpenModal(false);
  };

  const handleDeleteTask = async () => {
    const res = await axios.delete(
      `${import.meta.env.VITE_NODE_API}/kanban/task/${task._id}`,
      {
        headers: {
          Authorization: `Bearer ${user.user_id}`,
        },
      },
    );

    dispatch(deleteTask({ stageIndex, taskIndex }));
  };

  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={"Edit Task"}
      children={
        <>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FormInput
                label="Task Name"
                placeholder="Write task name"
                type="text"
                required={true}
                value={title}
                onChange={(text) => setTitle(text)}
              />
              <FormTextarea
                label="Description"
                placeholder="Write descrition about task"
                type="text"
                required={true}
                value={description}
                onChange={(text) => setDescription(text)}
              />
            </div>
          </div>

          <div className="-mt-4 mb-7">
            <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
              Due Date
            </label>
            <input
              className={`block w-full rounded-lg border border-gray-400 p-2 text-sm text-gray-900 outline-none
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white `}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <AssignedToDropdown
            contributors={contributors}
            setContributors={setContributors}
          />

          <Button
            label={"Save"}
            radius={"lg"}
            classes={"-mt-2"}
            onclick={handleUpdateTask}
          />
          <Button
            label={"Delete"}
            radius={"lg"}
            classes={
              "-mt-2 ml-2 bg-red-500 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-900 hover:bg-red-700"
            }
            onclick={handleDeleteTask}
          />
        </>
      }
    />
  );
};

export default EditTask;
