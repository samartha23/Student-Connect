import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { FilterXIcon, ListFilterIcon } from "lucide-react";
import {
  addUser,
  removeUser,
  setDate,
  setUsers,
} from "../../../../features/kanban/kanbanSlice";
import Button from "../../../Button";

const Filters = () => {
  const dispatch = useDispatch();

  const { details } = useSelector((store) => store.kanban);

  const [openFilter, setOpenFilter] = useState(false);

  const handleCheckboxChange = (event) => {
    const userId = event.target.value;

    if (event.target.checked) {
      dispatch(addUser(userId));
    } else {
      dispatch(removeUser(userId));
    }
  };

  return (
    <div className="mt-7 flex items-center gap-3">
      <div>
        <button
          className="flex items-center gap-2 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-white"
          onClick={() => setOpenFilter(!openFilter)}
        >
          Filter
          <ListFilterIcon className="h-4 w-4" />
        </button>

        <div
          className={twMerge(
            `absolute z-10 mt-2  w-56 rounded-lg bg-white p-3 shadow dark:bg-gray-700 ${
              openFilter ? "block" : "hidden"
            }`,
          )}
        >
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Assigned to
          </h6>
          <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
            {details?.members?.map((member) => (
              <li className="flex items-center" key={member._id}>
                <input
                  id={member.user_name}
                  type="checkbox"
                  value={member._id}
                  className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-3 w-3 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-500 dark:bg-gray-600"
                  onChange={handleCheckboxChange}
                />

                <label
                  htmlFor={member.user_name}
                  className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-100"
                >
                  {member.user_name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <input
          type="date"
          className="flex items-center gap-2 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 outline-none dark:bg-gray-700 dark:text-white"
          onChange={(e) => dispatch(setDate(e.target.value))}
          onClick={() => setOpenFilter(false)}
        />
      </div>

      <Button
        radius={"lg"}
        rightIcon={<FilterXIcon className="h-4 w-4" />}
        onclick={() => {
          dispatch(setUsers([]));
          dispatch(setDate(null));
          setOpenFilter(false);
        }}
      />
    </div>
  );
};

export default Filters;
