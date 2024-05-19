import React, { useState } from "react";
import FormInput from "../../../form/FormInput";
import { FilePlus2Icon } from "lucide-react";
import Button from "../../../Button";
import { notifyError } from "../../../../utils/toastsPopup";

const File = ({ setShowContentUploader }) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // complete this when api is completed
  const handleUploadFile = async () => {
    if (name.length <= 0) {
      return notifyError("Please fill required fields.");
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
    }

    setShowContentUploader(false);
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
      <FormInput
        label="File Name *"
        type="text"
        required={true}
        placeholder={"File Name"}
        className={"mb-0 md:w-[300px]"}
        value={name}
        onChange={(text) => setName(text)}
      />
      <FormInput
        label="Choose File *"
        type="file"
        required={true}
        onChange={handleFileChange}
        className={"mb-0"}
      />
      <Button
        label={"Submit"}
        radius={"lg"}
        classes={"px-3 py-2 md:-mb-5 h-fit w-fit"}
        onclick={handleUploadFile}
      />
    </div>
  );
};

export default File;
