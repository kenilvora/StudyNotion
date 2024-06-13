import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
const countryCode = require("../../../data/countrycode.json");

const SignUpForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password Do Not Match");
      return;
    }

    formData.contactNumber =
      formData.countryCode + " " + formData.contactNumber;

    const signUpData = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signUpData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+91",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2 justify-center items-center bg-richblack-800 px-1 py-1 w-fit rounded-full shadow-input">
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
      </div>
      <form
        action="submit"
        className="flex flex-col gap-4 "
        onSubmit={submitHandler}
        autoComplete="on"
      >
        <div className="flex gap-4 max-[460px]:flex-col">
          <label className="w-[50%] max-[460px]:w-full">
            <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
              First Name
              <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter Your FirstName"
              name="firstName"
              value={formData.firstName}
              autoComplete="on"
              required
              onChange={changeHandler}
              className=" bg-richblack-800 text-base p-[0.6rem] rounded-lg shadow-input w-full text-richblack-200"
            />
          </label>

          <label className="w-[50%] max-[460px]:w-full">
            <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
              Last Name
              <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter Your LastName"
              name="lastName"
              value={formData.lastName}
              autoComplete="on"
              required
              onChange={changeHandler}
              className=" bg-richblack-800 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full"
            />
          </label>
        </div>

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

        <label>
          <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
            Phone Number
            <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
          </p>
          <div className="flex gap-4 items-center h-full">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={changeHandler}
              className={`bg-richblack-800 w-[5rem] text-base py-[0.6rem] px-1 text-richblack-200 rounded-lg shadow-input h-[2.7rem]
                  ${formData.countryCode.length === 2 ? "px-5" : ""}
                  ${formData.countryCode.length === 3 ? "px-4" : ""}
                  ${formData.countryCode.length === 4 ? "px-[0.7rem]" : ""}
              `}
            >
              {countryCode.map((CountryCode, index) => (
                <option
                  value={CountryCode.code}
                  key={index}
                  className={`text-richblack-200 bg-richblack-800`}
                >
                  {CountryCode.code} - {CountryCode.country}
                </option>
              ))}
            </select>

            <input
              type="tel"
              placeholder="1234567890"
              name="contactNumber"
              value={formData.contactNumber}
              autoComplete="on"
              required
              maxLength={15}
              minLength={7}
              onChange={changeHandler}
              className="bg-richblack-800 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full"
            />
          </div>
        </label>

        <div className="flex gap-4 max-[460px]:flex-col">
          <label className="w-[50%] relative max-[460px]:w-full">
            <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
              Create Password
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

          <label className="w-[50%] relative max-[460px]:w-full">
            <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
              Confirm Password
              <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="confirmPassword"
              value={formData.confirmPassword}
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

        <button className="px-5 py-2 bg-yellow-50 rounded-lg text-black font-bold">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
