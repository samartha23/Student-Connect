import React from "react";
import Layout from "../../components/Layout";
import Portfolio from "../../components/profile/profileid/Portfolio";
import Resume from "../../components/profile/profileid/Resume";
import Header from "../../components/profile/profileid/Header";
import Tabs from "../../components/profile/profileid/Tabs";

const titles = ["Portfolio", "Resume"];
const tabs = {
  Portfolio: <Portfolio />,
  Resume: <Resume />,
};

const ProfileById = () => {
  return (
    <Layout>
      <Header />
      <Tabs titles={titles} tabs={tabs} />
    </Layout>
  );
};

export default ProfileById;
