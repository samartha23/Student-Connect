import React, { useState } from "react";
import Button from "../../../Button";
import FormInput from "../../../form/FormInput";
import { notifyError } from "../../../../utils/toastsPopup";

const Links = ({ setShowContentUploader }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleUploadLink = async () => {
    if (title.length <= 0 || link.length <= 0) {
      return notifyError("Please fill required fields.");
    }

    setShowContentUploader(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <FormInput
          label="Link Title*"
          type="text"
          required={true}
          placeholder={"Link Title"}
          className={"mb-0 md:w-[300px]"}
          value={title}
          onChange={(text) => setTitle(text)}
        />
        <FormInput
          label="Link *"
          type="text"
          required={true}
          placeholder={"Link"}
          className={"mb-0 md:w-[300px]"}
          value={link}
          onChange={(text) => setLink(text)}
        />
        <Button
          label={"Submit"}
          radius={"lg"}
          classes={"px-3 py-2 md:-mb-5 h-fit w-fit"}
          onclick={handleUploadLink}
        />
      </div>
    </div>
  );
};

export default Links;
