import { useState } from "react";
import FormInput from "../../components/form/FormInput";
import Button from "../../components/Button";
import { FaEnvelope, FaUserAlt, FaCommentAlt } from "react-icons/fa";
import Form from "../../components/form/Form";
import FormTextarea from "../../components/form/FormTextarea";
import Layout from "../../components/Layout";

const Contact = () => {
  const [email, setEmail] = useState("");

  return (
    <Layout>
      <Form label={"Contact Us"}>
        <FormInput
          label="Name"
          placeholder="Name"
          type="text"
          required={true}
          onChange={(text) => {}}
          leftIcon={<FaUserAlt className="text-sm text-slate-400" />}
        />
        <FormInput
          label="Email"
          placeholder="studentconnect@gmail.com"
          type="email"
          required={true}
          onChange={(text) => setEmail(text)}
          leftIcon={<FaEnvelope className="text-sm text-slate-400" />}
        />
        <FormTextarea
          label="Message"
          placeholder="Message"
          type="text"
          required={true}
          onChange={(text) => {}}
          leftIcon={<FaCommentAlt className="text-sm text-slate-400" />}
        />

        <Button label={"Submit"} radius={"lg"} />
      </Form>
    </Layout>
  );
};

export default Contact;
