import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import Heading from "../../components/texts/Headings";
import FormInput from "../../components/form/FormInput";
import JoditEditor from "jodit-react";
import { ImagePlusIcon, UploadIcon, X } from "lucide-react";
import Button from "../../components/Button";
import { storage } from "../../utils/firebase";
import postAPIData from "../../hooks/postAPIData";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { notifyError, notifySuccess } from "../../utils/toastsPopup";
import { blogCategories } from "../../utils/constants";
import capitalize from "../../utils/capitalize";
import { Link } from "react-router-dom";
import JoinImage from "../../../public/iamges/join.svg";

const AddBlog = () => {
  const { user } = useSelector((store) => store.user);

  const richTextAreaRef = useRef(null);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState(blogCategories[0]);
  const [description, setDescription] = useState("");

  const [fileLoading, setFileLoading] = useState(false);

  const { loading, data, error, sendData } = postAPIData();

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

  const handleUploadImage = async () => {
    setFileLoading(true);

    if (title === "" || file == null || tags == null || description === "") {
      setFileLoading(false);
      return notifyError("All field is required.");
    }

    const time = user.user_id + Date.now();

    const imageReference = ref(storage, "blogs/" + time);

    try {
      const snapshot = await uploadBytesResumable(imageReference, file);
      const url = await getDownloadURL(snapshot.ref);

      await sendData(
        `${import.meta.env.VITE_DJANGO_API}/blogs/create/`,
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
      setTitle("");
      setFile(null);
      setTags(null);
      setDescription("");

      document.getElementById("previewImage").src = "";
      document.getElementById("previewImage").classList.add("hidden");
    } catch (error) {
      notifyError("Could not create blog, try again later.");
    } finally {
      setFileLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      notifySuccess("Blog published successfully.");
    }
    if (error) {
      notifyError("Could not create blog, try again later.");
    }
  }, [data, error]);

  if (!user) {
    return (
      <Layout
        classes={
          "min-h-[80vh] flex items-center gap-10 justify-center md:flex-row flex-col"
        }
      >
        <h4 className="text-center text-base font-medium text-gray-900 dark:text-gray-300">
          Please Login / Signup to add blog.{" "}
          <Link className="block underline md:inline" to={"/signup"}>
            Click here to Signup.
          </Link>
        </h4>
        <img src={JoinImage} alt="hero-image" className="w-[50%] md:w-[20%]" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <div className="mb-8 flex items-center justify-between">
          <Heading level={3}>Add Blog</Heading>
          <Button
            label={loading | fileLoading ? "Publishing" : "Publish"}
            radius={"lg"}
            leftIcon={<UploadIcon className="h-4 w-4" />}
            classes={"px-5"}
            disable={loading | fileLoading}
            onclick={handleUploadImage}
          />
        </div>

        <div>
          <FormInput
            label="Title"
            type="text"
            required={true}
            placeholder={"Title"}
            value={title}
            onChange={(text) => setTitle(text)}
          />

          <div className="relative mb-12">
            <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
              Choose Banner Image
            </label>

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
                  "mb-2 h-20 w-40 rounded-md border object-cover dark:border-gray-700"
                }
              />
            </div>

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

          <div className="relative mb-3">
            <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
              Select Tags
            </label>
            <select
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-lg  border border-gray-400 p-2 text-sm outline-none dark:bg-gray-700 dark:text-gray-300"
              defaultValue={blogCategories[0]}
            >
              {blogCategories.map((category, index) => (
                <option key={index} value={category}>
                  {capitalize(category)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
              Description
            </label>
            <JoditEditor
              ref={richTextAreaRef}
              value={description}
              tabIndex={1}
              onBlur={(newDescription) => {
                console.log(newDescription);
                setDescription(newDescription);
              }}
              onChange={(newDescription) => {}}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddBlog;
