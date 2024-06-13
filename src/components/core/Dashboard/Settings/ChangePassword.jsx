import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../services/operations/profileAPI";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const { token } = useSelector((state) => state.auth);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const dispatch = useDispatch();

  const formSubmitHandler = (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("NewPassword and ConfirmNewPassword don't match");
      return;
    }

    dispatch(
      changePassword(
        data.oldPassword,
        data.newPassword,
        data.confirmNewPassword,
        token
      )
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-richblack-800 rounded-lg border border-richblack-600 px-10 py-8 max-[500px]:p-5">
      <div className="text-lg font-bold">Change Password</div>

      <form
        action="submit"
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="flex justify-between max-[1050px]:flex-col max-[1050px]:gap-5">
          <label className="relative w-[32%] max-[1050px]:w-full flex flex-col">
            <p className=" text-richblack-5 text-sm flex gap-[0.1rem] font-bold">
              Current Password
              <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
            </p>
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter Current Password"
              name="oldPassword"
              {...register("oldPassword", {
                required: {
                  value: true,
                  message: "Please Enter Your Current Password",
                },
              })}
              className="bg-richblack-700 text-base p-[0.6rem] rounded-lg shadow-input w-full text-richblack-200"
            />
            <span
              className="absolute top-[34px] text-richblack-200 text-2xl right-2 hover:cursor-pointer select-none"
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye></AiOutlineEye>
              )}
            </span>

            {errors.oldPassword && (
              <span className="text-richblack-300 opacity-80 text-sm font-bold mt-1">
                {errors.oldPassword.message}
              </span>
            )}
          </label>

          <label className="relative w-[32%] max-[1050px]:w-full flex flex-col">
            <p className=" text-richblack-5 text-sm flex gap-[0.1rem] font-bold">
              New Password
              <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
            </p>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New Password"
              name="newPassword"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "Please Enter Your New Password",
                },
              })}
              className="bg-richblack-700 text-base p-[0.6rem] rounded-lg shadow-input w-full text-richblack-200"
            />
            <span
              className="absolute top-[34px] text-richblack-200 text-2xl right-2 hover:cursor-pointer select-none"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye></AiOutlineEye>
              )}
            </span>

            {errors.newPassword && (
              <span className="text-richblack-300 opacity-80 text-sm font-bold mt-1">
                {errors.newPassword.message}
              </span>
            )}
          </label>

          <label className="relative w-[32%] max-[1050px]:w-full flex flex-col">
            <p className=" text-richblack-5 text-sm flex gap-[0.1rem] font-bold">
              Confirm Password
              <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
            </p>
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              name="confirmNewPassword"
              {...register("confirmNewPassword", {
                required: {
                  value: true,
                  message: "Please Enter Confirm New Password",
                },
              })}
              className=" bg-richblack-700 text-base p-[0.6rem] rounded-lg shadow-input w-full text-richblack-200"
            />
            <span
              className="absolute top-[34px] text-richblack-200 text-2xl right-2 hover:cursor-pointer select-none"
              onClick={() => setShowConfirmNewPassword((prev) => !prev)}
            >
              {showConfirmNewPassword ? (
                <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye></AiOutlineEye>
              )}
            </span>
            {errors.confirmNewPassword && (
              <span className="text-richblack-300 opacity-80 text-sm font-bold mt-1">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </label>
        </div>
        <div className="flex gap-4 justify-end items-center mt-5">
          <NavLink
            className="px-5 hover:cursor-pointer py-2 text-lg font-bold bg-richblack-700 rounded-md bg-opacity-70 border border-richblack-600"
            to={"/dashboard/my-profile"}
          >
            Cancel
          </NavLink>
          <button className=" bg-yellow-100 px-4 py-2 flex items-center rounded-md text-black font-bold gap-2 text-lg border border-yellow-5">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
