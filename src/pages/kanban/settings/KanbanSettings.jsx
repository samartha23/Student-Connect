import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormInput from "../../../components/form/FormInput";
import FormTextarea from "../../../components/form/FormTextarea";
import Button from "../../../components/Button";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AddMembersDropdown from "../../../components/kanban/board/dropdowns/AddMembersDropdown";
import Breadcrumb from "../../../components/kanban/board/header/Breadcrumb";
import KanbanLayout from "../KanbanLayout";
import { setProjectDetails } from "../../../features/kanban/kanbanSlice";
import getAPIData from "../../../hooks/getAPIData";
import Loader from "../../../components/Loader";

const KanbanSettings = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { details } = useSelector((store) => store.kanban);

  const [title, setTitle] = useState(details?.name);
  const [description, setDescription] = useState(details?.description);
  const [memberInfo, setMemberInfo] = useState(details?.lead);

  const { data, loading, error } = getAPIData(
    `${import.meta.env.VITE_NODE_API}/kanban/project/${id}`,
    {
      headers: {
        Authorization: `Bearer ${user?._id}`,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error) {
      dispatch(setProjectDetails(data.project));
    }
  }, [data, error]);

  return (
    <KanbanLayout>
      {loading ? (
        <div className="flex h-[80vh] w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full overflow-hidden p-3 px-4 md:px-6">
          <Breadcrumb
            toLink={"/kanban"}
            toText={"Projects"}
            title={`/ ${details?.name} / Project Settings`}
          />

          <div className="mb-5 text-xl font-semibold text-gray-900 dark:text-gray-300">
            Details
          </div>
          <div>
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FormInput
                  label="Task Name"
                  placeholder="Write task name"
                  type="text"
                  required={true}
                  value={title}
                  onChange={(text) => setTitle(text)}
                />
                <FormTextarea
                  label="Description"
                  placeholder="Write descrition about task"
                  type="text"
                  required={true}
                  value={description}
                  onChange={(text) => {
                    setDescription(text);
                  }}
                />
                <div className="h-4"></div>
                <AddMembersDropdown
                  label="Project Lead"
                  memberInfo={memberInfo}
                  setMemberInfo={setMemberInfo}
                />

                <div className="mt-4">
                  <Button label={"Save Changes"} radius={"lg"} />
                  <Button
                    label={"Move To Trash"}
                    radius={"lg"}
                    classes={
                      "ml-2 bg-red-500 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-900"
                    }
                    leftIcon={
                      <FaTrash className="h-3 w-3 text-sm dark:text-white" />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </KanbanLayout>
  );
};

export default KanbanSettings;
