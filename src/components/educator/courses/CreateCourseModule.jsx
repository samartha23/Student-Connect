import React, { useState } from "react";
import Modal from "../../Modal";
import FormInput from "../../form/FormInput";
import Button from "../../Button";
import { notifyError } from "../../../utils/toastsPopup";

const CreateCourseModule = ({ openModal, setOpenModal }) => {
  const [moduleName, seeModuleName] = useState("");

  const handleAddModule = async () => {
    if (moduleName.length <= 0) {
      return notifyError("Please fill required field.");
    }
  };

  return (
    <Modal
      title={"Add New Module"}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      <FormInput
        label="Course Module *"
        type="text"
        required={true}
        placeholder={"Course Moudle Name"}
        value={moduleName}
        onChange={(text) => seeModuleName(text)}
      />
      <Button label={"Submit"} radius={"lg"} onclick={handleAddModule} />
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

export default CreateCourseModule;
