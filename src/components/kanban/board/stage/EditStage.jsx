import React, { useState } from "react";
import Modal from "../../modal/Modal";
import FormInput from "../../../form/FormInput";
import Button from "../../../Button";
import FormTextarea from "../../../form/FormTextarea";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateStage } from "../../../../features/kanban/kanbanSlice";

const EditStage = ({ openModal, setOpenModal, stageIndex }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { details } = useSelector((store) => store.kanban);
  const { stages } = useSelector((store) => store.kanban);

  const [title, setTitle] = useState(stages[stageIndex].title);
  const [description, setDescription] = useState(
    stages[stageIndex].description,
  );

  const handleUpdateStage = async () => {
    const res = await axios.put(
      `${import.meta.env.VITE_NODE_API}/kanban/stage/${details._id}/${
        stages[stageIndex]._id
      }`,
      {
        title: title,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${user.user_id}`,
        },
      },
    );

    dispatch(
      updateStage({
        stageIndex,
        title: res.data.name,
        description: res.data.description,
      }),
    );

    setOpenModal(false);
  };

  const handleDeleteStage = async () => {};

  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={"Edit Stage"}
      children={
        <>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FormInput
                label="Stage Name"
                placeholder="Write task name"
                type="text"
                required={true}
                value={title}
                onChange={(text) => setTitle(text)}
              />
              <FormTextarea
                label="Description"
                placeholder="Write descrition about stage"
                type="text"
                required={true}
                value={description}
                onChange={(text) => setDescription(text)}
              />
            </div>
          </div>

          <Button
            label={"Save"}
            radius={"lg"}
            classes={"-mt-2"}
            onclick={handleUpdateStage}
          />
          <Button
            label={"Delete"}
            radius={"lg"}
            classes={
              "-mt-2 ml-2 bg-red-500 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-900 hover:bg-red-700"
            }
            onclick={handleDeleteStage}
          />
        </>
      }
    />
  );
};

export default EditStage;
