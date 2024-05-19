import React, { useEffect, useState } from "react";
import Modal from "./modal/Modal";
import getAPIData from "../../hooks/getAPIData";
import { useSelector } from "react-redux";
import postAPIData from "../../hooks/postAPIData";
import { notifyError, notifySuccess } from "../../utils/toastsPopup";
import FormTextarea from "../form/FormTextarea";
import Button from "../Button";

const CreateProject = ({ openModal, setOpenModal, projects, setProjects }) => {
  const { user } = useSelector((store) => store.user);

  // get projects for projectdropdown
  const [dropdownProjects, setDropdownProjects] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [leadInfo, setLeadInfo] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  const {
    data: dropdownData,
    loading: dropdownLoading,
    error: dropdownError,
  } = getAPIData(
    `${import.meta.env.VITE_DJANGO_API}/projects/get/owner/${user.user_id}/`,
    {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    },
  );

  useEffect(() => {
    if (!dropdownLoading && !dropdownError) {
      setDropdownProjects(dropdownData.projects);
    }
  }, [dropdownData, dropdownLoading]);

  // create projects
  const {
    data: createProjectData,
    loading: createProjectLoading,
    error: createProjectError,
    sendData,
  } = postAPIData();

  const handleCreateProject = async () => {
    if (title === "" || description === "" || leadInfo === "") {
      return notifyError("All fields are required.");
    }

    await sendData(
      `${import.meta.env.VITE_NODE_API}/kanban/project`,
      {
        Authorization: `Bearer ${user.user_id}`,
      },
      {
        name: title,
        description: description,
        lead: leadInfo,
        projectId,
        projectUrl,
      },
    );
  };

  useEffect(() => {
    if (createProjectData) {
      const data = { ...createProjectData };

      setTitle("");
      setDescription("");
      setLeadInfo("");
      setOpenModal(false);

      setProjects([...projects, data]);

      notifySuccess("Project created successfully.");
    }
    if (createProjectError) {
      notifyError("Could not create project, try again later.");
    }
  }, [createProjectData, createProjectError]);

  const handleChange = (e) => {
    setDescription("");
    setLeadInfo("");
    setProjectId("");
    setProjectUrl("");

    const selectedOption = e.target.options[e.target.selectedIndex];
    setTitle(e.target.value);

    const index = selectedOption.getAttribute("data-index");

    setDescription(
      dropdownProjects[index].project_description == null
        ? ""
        : dropdownProjects[index].project_description,
    );
    setLeadInfo(dropdownProjects[index].project_owner);
    setProjectId(dropdownProjects[index].project_id);
    setProjectUrl(dropdownProjects[index].project_url);
  };

  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={"Create Project"}
    >
      <>
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div className="mb-3">
              <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
                Select Project
              </label>
              <select
                onChange={handleChange}
                className="w-full rounded-lg  border border-gray-400 p-2 text-sm font-medium outline-none dark:bg-gray-700 dark:text-gray-300"
              >
                <option hidden={true}>Select Project</option>
                {dropdownProjects?.map((dropdownproject, index) => (
                  <option
                    key={dropdownproject.project_id}
                    value={dropdownproject.project_name}
                    data-index={index ? index : null}
                  >
                    {dropdownproject.project_name}
                  </option>
                ))}
              </select>
            </div>
            <FormTextarea
              label="Description"
              placeholder="Description"
              type="text"
              required={true}
              value={description}
              onChange={(text) => setDescription(text)}
            />
          </div>
        </div>
        <Button
          label={"Create Project"}
          radius={"lg"}
          classes={"-mt-2"}
          onclick={handleCreateProject}
          disable={createProjectLoading}
        />
      </>
    </Modal>
  );
};

export default CreateProject;
