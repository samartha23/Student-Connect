import React, { useState } from "react";
import Modal from "../../modal/Modal";
import FormInput from "../../../form/FormInput";
import Button from "../../../Button";
import FormTextarea from "../../../form/FormTextarea";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addStage } from "../../../../features/kanban/kanbanSlice";

const CreateStage = ({ openModal, setOpenModal, stageId }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { user } = useSelector((store) => store.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateStage = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_NODE_API}/kanban/stage/${id}`,
      {
        name: title,
        description: description,
        order: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${user.user_id}`,
        },
      },
    );

    setTitle("");
    setDescription("");
    setOpenModal(false);

    dispatch(addStage({ ...res.data, tasks: [], title: res.data.name }));
  };

  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={"Create New Group"}
      children={
        <>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FormInput
                label="Group Name"
                placeholder="Write group name"
                type="text"
                required={true}
                value={title}
                onChange={(text) => setTitle(text)}
              />
              <FormTextarea
                label="Enter a description"
                placeholder="Write descrition about this group"
                type="text"
                required={true}
                value={description}
                onChange={(text) => {
                  setDescription(text);
                }}
              />
            </div>
          </div>
          <Button
            label={"Create Group"}
            radius={"lg"}
            classes={"-mt-2"}
            onclick={handleCreateStage}
          />
        </>
      }
    />
  );
};

export default CreateStage;
