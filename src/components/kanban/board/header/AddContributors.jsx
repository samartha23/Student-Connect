import React, { useState } from "react";
import Modal from "../../modal/Modal";
import Button from "../../../Button";
import AddMembersDropdown from "../dropdowns/AddMembersDropdown";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMember } from "../../../../features/kanban/kanbanSlice";

const AddContributors = ({ openModal, setOpenModal }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const [memberInfo, setMemberInfo] = useState("");

  // add member to project
  const handleAddMember = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_NODE_API}/kanban/member/${id}`,
      {
        memberId: memberInfo._id,
      },
      {
        headers: {
          Authorization: `Bearer ${user._id}`,
        },
      },
    );

    dispatch(addMember(memberInfo));

    setOpenModal(false);
    setMemberInfo("");
  };

  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={"Add Contributor"}
      children={
        <>
          <div className="mb-4">
            <AddMembersDropdown
              memberInfo={memberInfo}
              setMemberInfo={setMemberInfo}
            />
          </div>
          <Button
            label={"Add Contributor"}
            radius={"lg"}
            classes={"-mt-2"}
            onclick={handleAddMember}
          />
        </>
      }
    />
  );
};

export default AddContributors;
