import { Edit, EyeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditTask from "./EditTask";
import DateLabel from "./Date";
import { Draggable } from "react-beautiful-dnd";
import FullTask from "./FullTask";
import ToolTip from "../../shared/ToolTip";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Task = ({ task, index, stageIndex }) => {
  const [searchParam] = useSearchParams();

  const { users, date } = useSelector((store) => store.kanban);

  const [fullDescriptionModal, setFullDescriptionModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    if (searchParam?.get("taskId") === task._id) {
      setFullDescriptionModal(true);
    }
  }, []);

  // compare selected date and task dueDate
  const datesMatch = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  // Conditionally render the component based on assignedTo and users arrays
  if (
    (users.length === 0 && (!date || datesMatch(task.dueDate, date))) ||
    (task.assignedTo.some((assigned) => users.includes(assigned._id)) &&
      (!date || datesMatch(task.dueDate, date)))
  ) {
    return (
      <>
        <Draggable draggableId={task._id} index={index}>
          {(provided) => (
            <div
              className="mb-4 w-full cursor-move rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-none dark:bg-gray-800 lg:p-6"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="mb-2 flex justify-between text-base font-semibold text-gray-900 dark:text-white">
                <h2 className="select-none">{task.title}</h2>
                <Edit
                  className="h-7 w-9 cursor-pointer rounded-lg p-[6px] text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  onClick={() => setEditModal(true)}
                />
              </div>
              {/* <img
          src="https://flowbite.com/application-ui/demo/images/kanban/task-3.jpg"
          className="mb-3 select-none rounded-lg"
        /> */}
              <div onClick={() => setFullDescriptionModal(true)}>
                <div className="flex items-center justify-between">
                  <div className="ml-1 flex">
                    {task?.assignedTo?.map((assigned) => (
                      <ToolTip
                        key={assigned._id}
                        children={
                          <Link to="#" className="-ml-2">
                            <img
                              src={assigned?.profile_image}
                              className="h-8 w-8 select-none rounded-full border-[1px] border-gray-300 dark:border-gray-600"
                            />
                          </Link>
                        }
                        message={assigned.user_name}
                      />
                    ))}
                  </div>
                  <div className="flex">
                    <EyeIcon className="h-7 w-9 cursor-pointer rounded-lg p-[6px]  text-gray-500" />
                    <DateLabel dueDate={task.dueDate} monthNames={monthNames} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
        <EditTask
          openModal={editModal}
          setOpenModal={setEditModal}
          isDragDisabled={true}
          stageIndex={stageIndex}
          task={task}
          taskIndex={index}
        />
        <FullTask
          openModal={fullDescriptionModal}
          setOpenModal={setFullDescriptionModal}
          task={task}
          stageIndex={stageIndex}
          taskIndex={index}
        />
      </>
    );
  } else {
    return null;
  }
};

export default Task;
