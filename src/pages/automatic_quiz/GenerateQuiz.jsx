import React, { useState } from "react";
import Layout from "../../components/Layout";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";
import Button from "../../components/Button";
import { FaQuestion } from "react-icons/fa";
import { BookOpenIcon, ListChecksIcon } from "lucide-react";
import FormSelect from "../../components/form/FormSelect";

const GenerateQuiz = () => {
  const [topic, setTopic] = useState("");
  const [number, setNumber] = useState(3);

  return (
    <Layout>
      <Form label={"Generate Quiz"}>
        <FormInput
          label="Topic"
          placeholder="Enter a topic"
          type="text"
          required={true}
          value={topic}
          onChange={(text) => setTopic(text)}
        />
        <FormInput
          label="Number of Questions"
          type="number"
          required={true}
          value={number}
          minvalue={3}
          onChange={(text) => setNumber(text)}
        />
        <FormSelect
          label={"Difficulty Level"}
          options={["Low", "Medium", "Hard"]}
        />
        <div className="my-4 flex justify-between">
          <Button
            label={"Multiple Choice"}
            radius={"lg"}
            leftIcon={<ListChecksIcon className="h-4 w-4" />}
            classes={
              "bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600"
            }
          />
          <Button
            label={"Open Ended"}
            radius={"lg"}
            leftIcon={<BookOpenIcon className="h-4 w-4" />}
            classes={
              "bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-300 dark:bg-gray-200 dark:hover:bg-gray-300"
            }
          />
        </div>
        <Button label={"Submit"} radius={"lg"} />
      </Form>
    </Layout>
  );
};

export default GenerateQuiz;
