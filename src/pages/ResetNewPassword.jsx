import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { resetPassword } from "../services/operations/authAPI";
import Spinner from "../components/common/Spinner";

const ResetNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const [userPasswordStrength, setUserPasswordStrength] = useState({
    minLength: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  function checkPassword(password) {
    const conditions = {
      minLength: password.length >= 8,
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    return conditions;
  }

  function checkPasswordStrength(password) {
    const conditions = checkPassword(password);

    // Check which conditions are met
    const passwordStrength = {
      minLength: conditions.minLength,
      hasLowerCase: conditions.hasLowerCase,
      hasUpperCase: conditions.hasUpperCase,
      hasNumber: conditions.hasNumber,
      hasSpecialChar: conditions.hasSpecialChar,
    };

    return passwordStrength;
  }

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === "newPassword") {
      setUserPasswordStrength(checkPasswordStrength(event.target.value));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    for (const key in userPasswordStrength) {
      if (!userPasswordStrength[key]) {
        toast.error("Password do not meet all Requirements");
        return;
      }
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Password Do Not Match");
      return;
    }

    const token = location.pathname.split("/").at(-1);
    dispatch(
      resetPassword(
        formData.newPassword,
        formData.confirmNewPassword,
        token,
        setResetComplete
      )
    );
  };

  return (
    <div className="flex justify-center items-center w-11/12 min-h-[calc(100vh-3.53rem)] max-w-maxContent mx-auto text-richblack-5">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flex justify-center items-center w-full">
          {!resetComplete ? (
            <div className="w-[28rem] p-4 flex flex-col justify-center gap-5">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-bold max-[395px]:text-2xl max-[330px]:text-[1.48rem]">
                  Choose New Password
                </div>
                <div className=" text-richblack-200 text-md">
                  Almost done. Enter your new password and you're all set.
                </div>
              </div>

              <form
                action="submit"
                className="flex flex-col gap-6"
                onSubmit={submitHandler}
              >
                <div className="flex flex-col gap-4">
                  <label className="relative">
                    <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                      New Password
                      <sup className="text-pink-200 text-base top-[-0.1rem]">
                        *
                      </sup>
                    </p>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      name="newPassword"
                      value={formData.newPassword}
                      required
                      onChange={changeHandler}
                      className="bg-richblack-800 text-base p-[0.6rem] rounded-lg shadow-input w-full text-richblack-200"
                    />
                    <span
                      className="absolute top-[34px] text-richblack-200 text-2xl right-2 hover:cursor-pointer select-none"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                      ) : (
                        <AiOutlineEye></AiOutlineEye>
                      )}
                    </span>
                  </label>

                  <label className="relative">
                    <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                      Confirm New Password
                      <sup className="text-pink-200 text-base top-[-0.1rem]">
                        *
                      </sup>
                    </p>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      required
                      onChange={changeHandler}
                      className=" bg-richblack-800 text-base p-[0.6rem] rounded-lg shadow-input w-full text-richblack-200"
                    />
                    <span
                      className="absolute top-[34px] text-richblack-200 text-2xl right-2 hover:cursor-pointer select-none"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                      ) : (
                        <AiOutlineEye></AiOutlineEye>
                      )}
                    </span>
                  </label>
                </div>

                <div className="flex text-sm justify-between max-[480px]:flex-col max-[480px]:gap-2">
                  <div className="flex flex-col gap-2 w-[45%] max-[480px]:w-full">
                    <div className="flex gap-1 items-center">
                      {userPasswordStrength.minLength ? (
                        <FaCheckCircle className="text-yellow-25 w-3"></FaCheckCircle>
                      ) : (
                        <FaRegCircle className="w-3"></FaRegCircle>
                      )}
                      <div
                        className={`${
                          userPasswordStrength.minLength ? "text-yellow-25" : ""
                        }`}
                      >
                        Minimum 8 Characters
                      </div>
                    </div>
                    <div className="flex gap-1 items-center">
                      {userPasswordStrength.hasUpperCase ? (
                        <FaCheckCircle className="text-yellow-25 w-3"></FaCheckCircle>
                      ) : (
                        <FaRegCircle className="w-3"></FaRegCircle>
                      )}
                      <div
                        className={`${
                          userPasswordStrength.hasUpperCase
                            ? "text-yellow-25"
                            : ""
                        }`}
                      >
                        One UpperCase Character
                      </div>
                    </div>
                    <div className="flex gap-1 items-center">
                      {userPasswordStrength.hasLowerCase ? (
                        <FaCheckCircle className="text-yellow-25 w-3"></FaCheckCircle>
                      ) : (
                        <FaRegCircle className="w-3"></FaRegCircle>
                      )}
                      <div
                        className={`${
                          userPasswordStrength.hasLowerCase
                            ? "text-yellow-25"
                            : ""
                        }`}
                      >
                        One LowerCase Character
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-[45%] max-[480px]:w-full">
                    <div className="flex gap-1 items-center">
                      {userPasswordStrength.hasNumber ? (
                        <FaCheckCircle className="text-yellow-25 w-3"></FaCheckCircle>
                      ) : (
                        <FaRegCircle className="w-3"></FaRegCircle>
                      )}
                      <div
                        className={`${
                          userPasswordStrength.hasNumber ? "text-yellow-25" : ""
                        }`}
                      >
                        One Number
                      </div>
                    </div>
                    <div className="flex gap-1 items-center">
                      {userPasswordStrength.hasSpecialChar ? (
                        <FaCheckCircle className="text-yellow-25 w-3"></FaCheckCircle>
                      ) : (
                        <FaRegCircle className="w-3"></FaRegCircle>
                      )}
                      <div
                        className={`${
                          userPasswordStrength.hasSpecialChar
                            ? "text-yellow-25"
                            : ""
                        }`}
                      >
                        One Special Character
                      </div>
                    </div>
                  </div>
                </div>
                <button className="px-5 py-2 bg-yellow-50 rounded-lg text-black font-bold">
                  Reset Password
                </button>
              </form>

              <NavLink
                to={"/login"}
                className="hover:cursor-pointer flex gap-2 items-center hover:text-yellow-50"
              >
                <IoIosArrowRoundBack className="text-2xl"></IoIosArrowRoundBack>
                Back to Login
              </NavLink>
            </div>
          ) : (
            <div className="w-[28rem] p-4 flex flex-col justify-center gap-5">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-bold max-[380px]:text-2xl">
                  Reset Complete!
                </div>
                <div className=" text-richblack-200 text-md">
                  All done! We have sent an email to confirm.
                </div>
              </div>

              <button
                className="px-5 py-2 bg-yellow-50 rounded-lg text-black font-bold"
                onClick={() => navigate("/login")}
              >
                Return to Login
              </button>

              <NavLink
                to={"/login"}
                className="hover:cursor-pointer flex gap-2 items-center hover:text-yellow-50"
              >
                <IoIosArrowRoundBack className="text-2xl"></IoIosArrowRoundBack>
                Back to Login
              </NavLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResetNewPassword;
