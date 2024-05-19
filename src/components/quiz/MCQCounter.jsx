import { CheckCircle2, XCircle } from "lucide-react";
import React from "react";

const MCQCounter = () => {
  return (
    <div className="flex flex-row items-center justify-center rounded-lg border p-3 shadow dark:border-gray-800">
      <CheckCircle2 color="green" size={30} />
      <span className="mx-3 text-xl font-semibold text-[green]">1</span>

      <span className="mx-3 text-xl font-semibold text-[red]">2</span>
      <XCircle color="red" size={30} />
    </div>
  );
};

export default MCQCounter;
