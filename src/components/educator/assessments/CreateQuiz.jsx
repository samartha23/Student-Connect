import React, { useState } from "react";
import FormInput from "../../form/FormInput";
import { CheckIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import Button from "../../Button";
import { twMerge } from "tailwind-merge";
import { notifyError } from "../../../utils/toastsPopup";

const CreateQuiz = ({ setAddQuiz }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [answer, setAnswer] = useState(null);

  const handleOptionChange = (index, text) => {
    const updatedOptions = [...options];
    updatedOptions[index] = text;
    setOptions(updatedOptions);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);

    if (updatedOptions.length <= 0) {
      setOptions([""]);
    }
  };

  const handleSubmitQuestion = async () => {
    const blankOption = options.some((item) => item === "" || item === null);

    if (question.length <= 0) {
      return notifyError("Please fill the question.");
    } else if (blankOption) {
      return notifyError("Option cannot be blank.");
    } else if (answer == null) {
      return notifyError("Please select the answer.");
    }

    setAddQuiz(false);
  };

  return (
    <div className="mt-5 rounded-lg bg-gray-100 p-5 dark:bg-gray-800">
      <div>
        <FormInput
          label="Question *"
          type="text"
          required={true}
          placeholder={"Question"}
          value={question}
          onChange={(text) => setQuestion(text)}
        />
        <span className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
          Options *
        </span>
        {options?.map((option, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="mb-2 flex items-center justify-center gap-2">
              <PlusCircleIcon
                className="h-4 w-4 cursor-pointer text-gray-500 dark:text-white"
                onClick={() => setOptions([...options, ""])}
              />
              <FormInput
                type="text"
                required={true}
                placeholder={"Add Option"}
                className={"mb-0 w-[350px]"}
                value={options[index]}
                onChange={(text) => handleOptionChange(index, text)}
              />
            </div>

            <div className="flex items-center justify-center gap-5">
              <div
                role="button"
                onClick={() => {
                  index === answer ? setAnswer(null) : setAnswer(index);
                }}
                className={twMerge(
                  `flex h-4 w-4 items-center justify-center rounded-sm border border-green-900 ${
                    index === answer ? "bg-green-300" : "bg-white"
                  }`,
                )}
              >
                {index === answer && (
                  <CheckIcon className="h-4 w-4 text-green-900" />
                )}
              </div>

              <Trash2Icon
                className="h-5 w-5 cursor-pointer rounded-md bg-red-300 p-1 text-red-700"
                onClick={() => handleDeleteOption(index)}
              />
            </div>
          </div>
        ))}

        <div className="mt-4 flex items-center justify-between border-t border-gray-300 pt-4 dark:border-gray-600">
          <div className="flex w-full justify-end">
            <Button
              label={"Submit"}
              radius={"lg"}
              onclick={handleSubmitQuestion}
            />
            <Button
              label={"Delete"}
              radius={"lg"}
              classes={
                "ml-2 bg-red-600 dark:bg-red-600 hover:bg-red-700 hover:dark:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800"
              }
              onclick={() => setAddQuiz(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
