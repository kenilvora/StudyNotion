import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(login(formData.email, formData.password, navigate));
    
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* <div className="flex gap-2 justify-center items-center bg-richblack-800 px-1 py-1 w-fit rounded-full shadow-input">
        <div
          className={`text-richblack-200 px-5 py-1 hover:bg-richblack-900 hover:cursor-pointer hover:text-richblack-5 rounded-full
            ${
              accountType === ACCOUNT_TYPE.STUDENT
                ? "bg-richblack-900 font-bold text-richblack-5"
                : ""
            }          
          `}
          onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}
        >
          Student
        </div>
        <div
          className={`text-richblack-200 px-5 py-1 hover:bg-richblack-900 hover:cursor-pointer hover:text-richblack-5 rounded-full
            ${
              accountType === ACCOUNT_TYPE.INSTRUCTOR
                ? "bg-richblack-900 font-bold text-richblack-5"
                : ""
            }
            `}
          onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
        >
          Instructor
        </div>
      </div> */}
      <form
        action="submit"
        className="flex flex-col gap-4"
        onSubmit={submitHandler}
      >
        <label>
          <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
            Email Address
            <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
          </p>
          <input
            type="email"
            placeholder="Enter Your Email Address"
            name="email"
            value={formData.email}
            autoComplete="on"
            required
            onChange={changeHandler}
            className=" bg-richblack-800 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full"
          />
        </label>

        <label className="relative w-full">
          <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
            Password
            <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            name="password"
            value={formData.password}
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

        <div className="flex justify-end">
          <NavLink
            to={"/reset-password"}
            className="text-blue-100 text-xs font-bold relative -top-2 w-fit"
          >
            Forgot Password
          </NavLink>
        </div>

        <button className="px-5 py-2 bg-yellow-50 rounded-lg text-black font-bold">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
