import React, { useEffect, useRef, useState } from "react";
import Modal from "../../Modal";
import FormInput from "../../form/FormInput";
import { ImagePlusIcon, X } from "lucide-react";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { blogCategories } from "../../../utils/constants";
import capitalize from "../../../utils/capitalize";
import { storage } from "../../../utils/firebase";
import putAPIData from "../../../hooks/putAPIData";
import { notifyError, notifySuccess } from "../../../utils/toastsPopup";
import Button from "../../Button";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { twMerge } from "tailwind-merge";
import {
  addBlog,
  deleteBlog,
} from "../../../features/dashboard/dashboardSlice";

const EditBlog = ({ blog, openModal, setOpenModal }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const richTextAreaRef = useRef(null);

  const [title, setTitle] = useState(blog?.title);
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState(blog?.category);
  const [description, setDescription] = useState(blog?.description);

  const [fileLoading, setFileLoading] = useState(false);

  const { data, loading, error, updateData } = putAPIData();

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("previewImage").src = e.target.result;
        document.getElementById("previewImage").classList.remove("hidden");
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      document.getElementById("previewImage").src = "";
      document.getElementById("previewImage").classList.add("hidden");
    }
  };

  const handleDeleteFileAndUpdate = async () => {
    setFileLoading(true);

    if (title === "" || tags == null || description === "") {
      setFileLoading(false);
      return notifyError("All field is required.");
    }

    if (file == null) {
      await updateData(
        `${import.meta.env.VITE_DJANGO_API}/blogs/update/${blog.blog_id}/`,
        {
          Authorization: `Token ${user.token}`,
        },
        {
          title: title,
          description: description,
          banner: blog.banner,
          banner_ref: blog.banner_ref,
          banner_type: blog.banner_type,
          category: tags,
        },
      );
      setFileLoading(false);
      return;
    }

    const deleteRef = ref(storage, `blogs/${blog.banner_ref}`);

    try {
      deleteObject(deleteRef).then(() => {
        const time = user.user_id + Date.now();

        const imageReference = ref(storage, "blogs/" + time);

        uploadBytesResumable(imageReference, file)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
              await updateData(
                `${import.meta.env.VITE_DJANGO_API}/blogs/update/${
                  blog.blog_id
                }/`,
                {
                  Authorization: `Token ${user.token}`,
                },
                {
                  title: title,
                  description: description,
                  banner: url,
                  banner_ref: time,
                  banner_type: snapshot.metadata.contentType?.split("/")[1],
                  category: tags,
                },
              );
            });
          })
          .catch((error) => {
            notifyError(`Cannot update blog. Please try again.`);
          });
      });
    } catch (error) {
      console.log(error);
      notifyError("Error while updating blog.");
    }

    setFileLoading(false);
  };

  useEffect(() => {
    if (data) {
      dispatch(deleteBlog(blog.blog_id));
      dispatch(addBlog(data.blog));
      notifySuccess("Blog updated.");
      setOpenModal(false);
    }
    if (error) {
      console.log(error);
      notifyError("Error while updating blog.");
      setOpenModal(false);
    }
  }, [data, error]);

  return (
    <div>
      <Modal
        title={"Edit Blog"}
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalClasses={"max-w-4xl"}
      >
        <div>
          <FormInput
            label="Title"
            type="text"
            required={true}
            placeholder={"Title"}
            value={title}
            onChange={(text) => setTitle(text)}
          />

          <div className="flex gap-3">
            <div className="relative mb-12 flex-1">
              <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
                Choose Banner Image
              </label>

              <label
                htmlFor="fileInput"
                className="absolute left-0 right-0 flex items-center gap-3 rounded-lg border  border-gray-400 p-2 text-sm dark:bg-gray-700 dark:text-gray-300"
              >
                Choose image{" "}
                <ImagePlusIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </label>
              <input
                type="file"
                name="fileInput"
                id="fileInput"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            <div className="relative mb-3 flex-1">
              <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
                Select Tags
              </label>
              <select
                defaultValue={blog.category}
                onChange={(e) => setTags(e.target.value)}
                className="w-full rounded-lg  border border-gray-400 p-2 text-sm outline-none dark:bg-gray-700 dark:text-gray-300"
              >
                {blogCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {capitalize(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            {file && (
              <X
                className="absolute left-0 top-0 h-4 w-4 cursor-pointer rounded-full bg-red-700 p-[2px] text-white"
                onClick={() => {
                  setFile(null);
                  document.getElementById("previewImage").src = "";
                  document
                    .getElementById("previewImage")
                    .classList.add("hidden");
                }}
              />
            )}
            <img
              id="previewImage"
              className={
                file &&
                "mb-2 h-40 w-full rounded-md border object-cover dark:border-gray-700"
              }
            />
          </div>

          <img
            className={twMerge(
              `${
                file == null
                  ? "mb-2 h-40 w-full rounded-md border object-cover dark:border-gray-700"
                  : "hidden"
              }`,
            )}
            src={blog.banner}
          />

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
              Description
            </label>
            <JoditEditor
              ref={richTextAreaRef}
              value={description}
              tabIndex={1}
              onBlur={(newDescription) => {
                setDescription(newDescription);
              }}
              onChange={(newDescription) => {}}
            />
          </div>
        </div>

        <div>
          <Button
            label={"Update"}
            radius={"lg"}
            classes={"px-5 mt-4"}
            disable={loading | fileLoading}
            onclick={handleDeleteFileAndUpdate}
          />
          <Button
            label={"Cancel"}
            radius={"lg"}
            classes={
              "px-5 mt-4 bg-red-600 dark:bg-red-600 ml-3 hover:bg-red-700 hover:dark:bg-red-700 focus:ring-red-800 dark:focus:ring-red-800"
            }
            onclick={() => setOpenModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default EditBlog;
