import React, { useState } from "react";
import Modal from "../../modal/Modal";
import FormInput from "../../../form/FormInput";
import Button from "../../../Button";
import FormTextarea from "../../../form/FormTextarea";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../../features/kanban/kanbanSlice";
import AssignedToDropdown from "../dropdowns/AssignedToDropdown";

const CreateTask = ({ openModal, setOpenModal, stageId }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { details } = useSelector((store) => store.kanban);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [contributors, setContributors] = useState([]);

  const handleCreateTask = async () => {
    console.log(contributors);

    let contributorsIds = [];

    contributors?.map((contributor) =>
      contributorsIds.push(contributor.user_id),
    );

    const res = await axios.post(
      `${import.meta.env.VITE_NODE_API}/kanban/task/${stageId}`,
      {
        title: title,
        description: description,
        addedBy: user.user_id,
        assignedTo: contributorsIds,
        dueDate: dueDate,
        labels: [""],
        projectId: details._id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.user_id}`,
        },
      },
    );

    const data = { ...res.data, assignedTo: contributors };

    dispatch(addTask({ stageId: stageId, task: data }));

    setTitle("");
    setDescription("");
    setContributors([]);
    setOpenModal(false);
  };

  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={"Create New Task"}
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
                label="Enter a description"
                placeholder="Write descrition about task"
                type="text"
                required={true}
                value={description}
                onChange={(text) => {
                  setDescription(text);
                }}
              />
              <FormInput
                label="Due date"
                placeholder="Write descrition about task"
                type="date"
                required={true}
                value={dueDate}
                onChange={(text) => {
                  setDueDate(text);
                }}
              />
            </div>
          </div>

          <AssignedToDropdown
            contributors={contributors}
            setContributors={setContributors}
          />

          <Button
            label={"Add Task"}
            radius={"lg"}
            classes={"-mt-2"}
            onclick={handleCreateTask}
          />
        </>
      }
    />
  );
};

export default CreateTask;
