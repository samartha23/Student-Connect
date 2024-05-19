import React from "react";
import Heading from "../../../components/texts/Headings";
import Sidebar from "../../../components/educator/Sidebar";

const Dashboard = () => {
  return (
    <Sidebar>
      <div className="text-white">
        <Heading level={4} classes={"font-semibold"}>
          Dashboard
        </Heading>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
