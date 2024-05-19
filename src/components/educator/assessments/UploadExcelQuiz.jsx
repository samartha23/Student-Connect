import React, { useState } from "react";
import Modal from "../../Modal";
import FormInput from "../../form/FormInput";
import Button from "../../Button";
import postAPIData from "../../../hooks/postAPIData";
import { useSelector } from "react-redux";
import { notifyError } from "../../../utils/toastsPopup";

const UploadExcelQuiz = ({ openModal, setOpenModal }) => {
  const { user } = useSelector((store) => store.user);

  const { loading, data, error, sendData } = postAPIData();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // complete this when api is completed
  const handleUploadExcelFile = async () => {
    if (!selectedFile) {
      return notifyError("Please select excel file to upload quiz.");
    }

    const formData = new FormData();
    formData.append("quizFile", selectedFile);

    try {
      await sendData(
        `${import.meta.env.VITE_DJANGO_API}/`,
        {
          Authorization: `Token ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
        formData,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title={"Upload Quiz"}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      <FormInput
        label="Select Excel File *"
        type="file"
        required={true}
        onChange={handleFileChange}
      />

      <Button label={"Submit"} radius={"lg"} onclick={handleUploadExcelFile} />
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

export default UploadExcelQuiz;
