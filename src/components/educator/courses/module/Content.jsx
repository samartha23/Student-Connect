import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import Button from "../../../Button";
import { notifyError } from "../../../../utils/toastsPopup";

const Content = ({ setShowContentUploader }) => {
  const richTextAreaRef = useRef();

  const [description, setDescription] = useState("");

  const handleUploadContent = async () => {
    if (description.length <= 0) {
      return notifyError("Please fill required fields.");
    }

    setShowContentUploader(false);
  };

  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
        Write Article *
      </label>
      <JoditEditor
        className="h-[200px]"
        ref={richTextAreaRef}
        value={description}
        tabIndex={1}
        onBlur={(newDescription) => {
          console.log(newDescription);
          setDescription(newDescription);
        }}
        onChange={(newDescription) => {}}
      />
      <Button
        label={"Submit"}
        radius={"lg"}
        classes={"px-3 py-2 mt-0 md:-mb-3 h-fit w-fit mt-5"}
        onclick={handleUploadContent}
      />
    </div>
  );
};

export default Content;
