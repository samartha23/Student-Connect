import React, { useState } from "react";
import Task from "../task/Task";
import { Edit, PlusIcon } from "lucide-react";
import CreateTask from "../task/CreateTask";
import { Droppable } from "react-beautiful-dnd";
import EditStage from "./EditStage";
import { useSelector } from "react-redux";

const Stage = ({ title, tasks, stageId, stageIndex }) => {
  const { users } = useSelector((store) => store.kanban);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openStageEditModal, setOpenStageEditModal] = useState(false);

  return (
    <Droppable droppableId={stageId}>
      {(provided) => (
        <div className="h-fit rounded-lg border-2 border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="cursor-move select-none text-sm font-semibold text-gray-700 dark:text-gray-300">
              {title}
              <span className="ml-3 cursor-pointer rounded-full bg-gray-200 px-[7px] py-[2px] text-xs text-gray-900 dark:bg-gray-500 dark:text-gray-50">
                {tasks?.length}
              </span>
            </div>

            <Edit
              className="h-7 w-9 cursor-pointer rounded-lg p-[6px] text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100"
              onClick={() => setOpenStageEditModal(true)}
            />
          </div>

          <div
            className="mt-3 "
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks?.map((task, index) => (
              <Task
                key={task._id}
                task={task}
                index={index}
                stageIndex={stageIndex}
              />
            ))}
            {provided.placeholder}

            <div
              className="flex w-[300px] cursor-pointer select-none items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-3 text-gray-500 hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-800 lg:w-[350px]"
              onClick={() => setOpenCreateModal(true)}
            >
              <PlusIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">Add another Card</span>
            </div>

            <CreateTask
              openModal={openCreateModal}
              setOpenModal={setOpenCreateModal}
              stageId={stageId}
            />

            <EditStage
              openModal={openStageEditModal}
              setOpenModal={setOpenStageEditModal}
              stageIndex={stageIndex}
            />
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Stage;
