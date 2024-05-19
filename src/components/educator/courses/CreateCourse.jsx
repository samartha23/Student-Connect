import React, { useState } from "react";
import Modal from "../../Modal";
import FormInput from "../../form/FormInput";
import FormTextarea from "../../form/FormTextarea";
import Button from "../../Button";
import { notifyError } from "../../../utils/toastsPopup";

const CreateCourse = ({ openModal, setOpenModal }) => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleAddCourse = async () => {
    if (courseName.length <= 0 || description.length <= 0) {
      return notifyError("Please fill required fields.");
    }
  };

  return (
    <Modal
      title={"Add New Course"}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      <FormInput
        label="Course Name *"
        type="text"
        required={true}
        placeholder={"Course Name"}
        value={courseName}
        onChange={(text) => setCourseName(text)}
      />
      <FormTextarea
        label="Description *"
        placeholder="Description"
        type="text"
        required={true}
        value={description}
        onChange={(text) => setDescription(text)}
      />
      <FormInput
        label="Cover Image"
        type="text"
        placeholder={"Cover Image Link"}
        value={coverImage}
        ionChange={(text) => setCoverImage(text)}
      />
      <Button label={"Submit"} radius={"lg"} onclick={handleAddCourse} />
      <Button
        label={"Cancel"}
        radius={"lg"}
        classes={
          "ml-2 bg-red-600 dark:bg-red-600 hover:bg-red-700 hover:dark:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800"
        }
        onclick={() => setOpenModal(false)}
      />
    </Modal>
  );
};

export default CreateCourse;
