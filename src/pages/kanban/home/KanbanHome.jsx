import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import getAPIData from "../../../hooks/getAPIData";
import Loader from "../../../components/Loader";
import Paragraph from "../../../components/texts/Paragraph";
import CreateProject from "../../../components/kanban/CreateProject";
import Skeleton from "react-loading-skeleton";

const KanbanHome = () => {
  const { user } = useSelector((store) => store.user);

  const [openModal, setOpenModal] = useState(false);

  const [projects, setProjects] = useState([]);

  // get projects
  const { data, loading, error } = getAPIData(
    `${import.meta.env.VITE_NODE_API}/kanban/project`,
    {
      headers: {
        Authorization: `Bearer ${user.user_id}`,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error) {
      console.log(data);
      setProjects(data);
    }
  }, [data, loading, error]);

  return (
    <Layout>
      <div>
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Projects
          </h2>
          <Button
            label={"Create Project"}
            radius={"lg"}
            classes={"p-2"}
            onclick={() => setOpenModal(true)}
          />
        </div>

        {loading ? (
          <LoadingTableSkeleton count={2} />
        ) : projects?.length <= 0 ? (
          <Paragraph>No projects found. Please create new projects</Paragraph>
        ) : (
          <div className="relative overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-none dark:bg-gray-800">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-900 dark:bg-gray-700 dark:text-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lead
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    className="border-b bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    key={project._id}
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/kanban/${project._id}`}
                        className="hover:underline"
                      >
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to="#">{project.lead?.user_name}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CreateProject
        openModal={openModal}
        setOpenModal={setOpenModal}
        projects={projects}
        setProjects={setProjects}
      />
    </Layout>
  );
};

export default KanbanHome;

const LoadingTableSkeleton = ({ count }) => {
  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-none dark:bg-gray-800">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-900 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Lead
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(count)
            .fill(0)
            .map((item, index) => (
              <tr
                className="border-b bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                key={index}
              >
                <td className="px-6 py-4">
                  <Skeleton count={1} />
                </td>
                <td className="px-6 py-4">
                  <Skeleton count={1} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
