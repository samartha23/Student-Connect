import React from "react";
import Layout from "../../components/Layout";
import Heading from "../../components/texts/Headings";
import SingleContribution from "../../components/opencontributions/SingleContribution";

const OpenContributions = () => {
  return (
    <Layout>
      <Heading level={2} classes={"mb-5"}>
        Search for open contributions
      </Heading>

      <div>
        <SingleContribution />
        <SingleContribution />
        <SingleContribution />
        <SingleContribution />
      </div>
    </Layout>
  );
};

export default OpenContributions;
