import React, { useState } from "react";
import FormInput from "../../../form/FormInput";
import { Search, X } from "lucide-react";
import { useSelector } from "react-redux";

const AssignedToDropdown = ({ contributors, setContributors }) => {
  const { details } = useSelector((store) => store.kanban);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(details?.members);
  const [showList, setShowList] = useState(false);

  const handleAddContributor = async (data) => {
    if (
      contributors.filter((contributor) => contributor.user_id === data.user_id)
        .length <= 0
    ) {
      setContributors([...contributors, data]);
    }
  };

  const handleRemoveContributor = async (indexToDelete) => {
    setContributors((contributors) =>
      contributors.filter((_, index) => index !== indexToDelete),
    );
  };

  return (
    <div className="-mt-4 mb-4">
      <div className="sm:col-span-2">
        <FormInput
          label="Assigned to"
          placeholder="John Doe, johndoe@gmail.com"
          type="text"
          required={true}
          value={search}
          onChange={(text) => setSearch(text)}
          rightIcon={<Search className="h-5 w-5 text-sm text-slate-400" />}
          handleFocusCaputer={() => setShowList(true)}
        />
      </div>
      <div className="flex gap-2">
        {contributors?.map((contributor, index) => (
          <div
            className="mb-3 flex w-fit items-center gap-1 rounded-lg bg-gray-200 p-1 px-2 dark:bg-gray-600"
            key={index}
          >
            <span className="text-sm font-medium text-slate-700 dark:text-slate-100">
              {contributor.user_name}
            </span>
            <X
              className="h-4 w-4 cursor-pointer text-sm text-slate-700 dark:text-slate-100"
              onClick={() => handleRemoveContributor(index)}
            />
          </div>
        ))}
      </div>
      {showList && users?.length > 0 && (
        <div>
          <ul className="max-h-40 overflow-hidden overflow-y-auto rounded-md border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
            {users
              .filter((user) =>
                user.user_name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((user) => (
                <li
                  className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-200 hover:dark:bg-gray-700"
                  key={user._id}
                  onClick={() => {
                    handleAddContributor(user);
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

export default AssignedToDropdown;
