import React from "react";
import { Link } from "react-router-dom";
import Paragraph from "../texts/Paragraph";

const AuthFormFooter = ({ text, url }) => {
  return (
    <Paragraph classes={"text-center mt-2"}>
      {text} <Link to={"/" + url}>Click here</Link>
    </Paragraph>
  );
};

export default AuthFormFooter;
