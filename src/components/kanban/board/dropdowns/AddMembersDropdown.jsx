import React, { useEffect, useState } from "react";
import FormInput from "../../../form/FormInput";
import { Search, X } from "lucide-react";
import axios from "axios";
import useDebounce from "../../../../hooks/useDebounce";

const AddMembersDropdown = ({ label, memberInfo, setMemberInfo }) => {
  var typingTimer = null;

  const [memberName, setMemberName] = useState("");
  const [users, setUsers] = useState(null);

  const debouncedSearch = useDebounce(memberName, 500);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `${import.meta.env.VITE_NODE_API}/kanban/users?user=${memberName}`,
      );

      console.log(res);

      setUsers(res.data);
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <div className="-mt-4 mb-4">
      <div className="sm:col-span-2">
        <FormInput
          label={label ? label : "Name, username, email"}
          placeholder="John Doe, johndoe@gmail.com"
          type="text"
          required={true}
          value={memberName}
          onChange={(text) => setMemberName(text)}
          rightIcon={<Search className="h-5 w-5 text-sm text-slate-400" />}
        />
      </div>
      {memberInfo && (
        <div className="mb-3 flex w-fit items-center gap-1 rounded-lg bg-gray-200 p-1 px-2 dark:bg-gray-600">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-100">
            {memberInfo.user_name}
          </span>
          <X
            className="h-4 w-4 cursor-pointer text-sm text-slate-700 dark:text-slate-100"
            onClick={() => {
              setMemberInfo("");
            }}
          />
        </div>
      )}
      {users?.length > 0 && (
        <div>
          <ul className="max-h-40 overflow-hidden overflow-y-auto rounded-md border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
            {users.map((user) => (
              <li
                className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-200 hover:dark:bg-gray-700"
                key={user._id}
                onClick={() => {
                  setMemberInfo(user);
                  setUsers(null);
                }}
              >
                <img
                  src={user.profile_image}
                  className="h-6 w-6 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.user_name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddMembersDropdown;
