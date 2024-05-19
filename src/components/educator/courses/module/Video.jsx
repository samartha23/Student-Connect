import React, { useState } from "react";
import FormInput from "../../../form/FormInput";
import Button from "../../../Button";
import { notifyError } from "../../../../utils/toastsPopup";

const Video = ({ setShowContentUploader }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleUploadVideo = async () => {
    if (title.length <= 0 || link.length <= 0) {
      return notifyError("Please fill required fields.");
    }

    setShowContentUploader(false);
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
      <FormInput
        label="Video Title *"
        type="text"
        required={true}
        placeholder={"Video Title"}
        className={"mb-0 md:w-[300px]"}
        value={title}
        onChange={(text) => setTitle(text)}
      />
      <FormInput
        label="Video Url *"
        type="text"
        required={true}
        placeholder={"Video Url"}
        className={"mb-0 md:w-[300px]"}
        value={link}
        onChange={(text) => setLink(text)}
      />
      <Button
        label={"Submit"}
        radius={"lg"}
        classes={"px-3 py-2 mt-0 md:-mb-5 h-fit w-fit"}
        onclick={handleUploadVideo}
      />
    </div>
  );
};

export default Video;
