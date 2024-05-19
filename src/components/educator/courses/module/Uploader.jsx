import React from "react";
import { twMerge } from "tailwind-merge";
import Video from "./Video";
import File from "./File";
import Links from "./Links";
import Content from "./Content";

const Uploader = ({
  materials,
  selectedMaterial,
  setSelectedMaterial,
  setShowContentUploader,
}) => {
  return (
    <div>
      <div className="mb-8 mt-5 flex w-fit rounded-md border text-sm dark:border-gray-700">
        {materials?.map((material, index) => (
          <div
            role="button"
            key={index}
            className={twMerge(
              `rounded-md px-2 py-2 dark:text-white ${
                selectedMaterial === material && "bg-blue-600 text-white"
              }`,
            )}
            onClick={() => setSelectedMaterial(material)}
          >
            {material}
          </div>
        ))}
      </div>

      {selectedMaterial === "Video" ? (
        <Video setShowContentUploader={setShowContentUploader} />
      ) : selectedMaterial === "File" ? (
        <File setShowContentUploader={setShowContentUploader} />
      ) : selectedMaterial === "Links" ? (
        <Links setShowContentUploader={setShowContentUploader} />
      ) : (
        <Content setShowContentUploader={setShowContentUploader} />
      )}
    </div>
  );
};

export default Uploader;
