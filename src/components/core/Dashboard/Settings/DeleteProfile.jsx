import React, { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../../../services/operations/profileAPI";

const DeleteProfile = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 max-[500px]:gap-2 bg-pink-900 rounded-lg border border-pink-700 px-10 py-8 max-[500px]:p-4">
      <div className="bg-pink-700 flex justify-center items-center p-2 rounded-full h-fit">
        <BiSolidTrash className="text-4xl font-black max-[500px]:text-lg text-pink-25"></BiSolidTrash>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold">Delete Account</div>
        <div className="text-richblack-300 text-base max-[500px]:text-sm font-semibold flex flex-col gap-1">
          <p>Would you like to delete account?</p>
          <p>
            This account may contains Paid Courses. Deleting your account will
            remove all the content associated with it.
          </p>
        </div>
        <button
          className="text-pink-300 w-fit text-left font-bold italic text-lg max-[500px]:text-base hover:underline"
          onClick={() => {
            setConfirmationModal({
              text1: "Are You Sure?",
              text2: "Confirm deletion? All your data lost.",
              btn1: "Delete My Account",
              btn2: "Cancel",
              btn1Handler: () => {
                dispatch(deleteAccount(navigate));
              },
              btn2Handler: () => {
                setConfirmationModal(null);
              },
            });
          }}
        >
          I want to delete my account.
        </button>
      </div>

      {confirmationModal && (
        <ConfirmationModal data={confirmationModal}></ConfirmationModal>
      )}
    </div>
  );
};

export default DeleteProfile;
