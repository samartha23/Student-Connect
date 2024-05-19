import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../components/kanban/notification/Notification";
import Breadcrumb from "../../../components/kanban/board/header/Breadcrumb";
import KanbanLayout from "../KanbanLayout";
import getAPIData from "../../../hooks/getAPIData";
import { setProjectDetails } from "../../../features/kanban/kanbanSlice";
import Loader from "../../../components/Loader";
import Paragraph from "../../../components/texts/Paragraph";

const KanbanNotifications = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { user } = useSelector((store) => store.user);

  const { details } = useSelector((store) => store.kanban);
  const { notifications } = useSelector((store) => store.kanban);

  const { data, loading, error } = getAPIData(
    `${import.meta.env.VITE_NODE_API}/kanban/project/${id}`,
    {
      headers: {
        Authorization: `Bearer ${user?.user_id}`,
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
            title={`/ ${details?.name} / Notifications`}
          />
          <div className="mb-5 text-xl font-semibold text-gray-900 dark:text-gray-300">
            Notifications
          </div>
          {notifications?.length <= 0 ? (
            <Paragraph>No notifications 🔕</Paragraph>
          ) : (
            <div>
              {notifications.map((notification) => (
                <Notification
                  notification={notification}
                  key={notification._id}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </KanbanLayout>
  );
};

export default KanbanNotifications;
