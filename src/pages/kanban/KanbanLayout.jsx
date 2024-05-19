import React, { useEffect } from "react";
import Sidebar from "../../components/kanban/sidebar/Sidebar";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  addNotification,
  setNotifications,
} from "../../features/kanban/kanbanSlice";
import getAPIData from "../../hooks/getAPIData";

const KanbanLayout = ({ children }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const { data, loading, error } = getAPIData(
    `${import.meta.env.VITE_NODE_API}/kanban/notification/${id}`,
    {
      headers: {
        Authorization: `Bearer ${user?.user_id}`,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error) {
      dispatch(setNotifications(data));
    }
  }, [data, error]);

  // Socket Connection
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on(`notification_${user.user_id}`, (notification) => {
      dispatch(addNotification(JSON.parse(notification)));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Layout classes={"mx-0 px-0 py-0 min-w-full"}>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </Layout>
  );
};

export default KanbanLayout;
