import React from "react";
import Layout from "../../components/Layout";
import { ChevronRightIcon, TimerIcon } from "lucide-react";
import Question from "../../components/quiz/Question";
import MCQOption from "../../components/quiz/MCQOption";
import Button from "../../components/Button";
import MCQCounter from "../../components/quiz/MCQCounter";

const AutomaticQuiz = () => {
  return (
    <Layout classes={"px-48"}>
      {/* Header */}
      <div className="mb-8 flex justify-between">
        <div>
          <p>
            <span className="font-semibold text-slate-700 dark:text-gray-300">
              Topic
            </span>{" "}
            &nbsp;
            <span className="rounded-lg bg-slate-800 px-2 py-1 text-white">
              Devops
            </span>
          </p>
          <div className="mt-4 flex gap-2 text-gray-500 ">
            <TimerIcon className="h-5 w-5 dark:text-white" />
            <span className="font-medium  dark:text-gray-300">09:10 sec</span>
          </div>
        </div>
        <div>
          <MCQCounter />
        </div>
      </div>

      {/* Question  */}
      <Question />

      {/* Options */}
      <div className="mt-3">
        <MCQOption />
        <MCQOption />
        <MCQOption />
        <MCQOption />
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Button
          label={"Next"}
          rightIcon={<ChevronRightIcon className="h-5 w-5" />}
          radius={"md"}
          classes={"px-10"}
        />
      </div>
    </Layout>
  );
};

export default AutomaticQuiz;
