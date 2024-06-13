import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import countryCode from "../../../../data/countrycode.json";
import { NavLink } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/profileAPI";

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      countryCode:
        (user?.additionalDetails?.contactNumber &&
          user?.additionalDetails?.contactNumber.split(" ").at(0)) ||
        "+91",
    },
  });

  const dispatch = useDispatch();

  const code = watch("countryCode"); // Watch for changes to the countryCode field

  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];

  const formSubmitHandler = (data) => {
    data.contactNumber = data.countryCode + " " + data.contactNumber;

    dispatch(
      updateProfile(
        data.dateOfBirth,
        data.gender,
        data.contactNumber,
        data.about,
        token
      )
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-richblack-800 rounded-lg border border-richblack-600 justify-center px-10 py-8 max-[500px]:p-5">
      <div className="text-lg font-bold">Profile Information</div>

      <form
        action="submit"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="flex gap-4 max-[890px]:flex-col">
          <label className="w-[50%] max-[890px]:w-full flex flex-col gap-1">
            <p className=" text-richblack-5 text-sm font-bold">Date Of Birth</p>
            <input
              type="date"
              name="dateOfBirth"
              defaultValue={user?.additionalDetails?.dateOfBirth}
              {...register("dateOfBirth", {
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              className=" bg-richblack-700 text-base p-[0.6rem] rounded-lg shadow-input w-full text-richblack-200 font-semibold"
              style={{ "--tw-w-4": "1.5rem", "--tw-h-4": "1.5rem" }}
            />
            {errors.dateOfBirth && (
              <span className="text-richblack-300 opacity-80 text-sm font-bold">
                {errors.dateOfBirth.message}
              </span>
            )}
          </label>

          <label className="w-[50%] max-[890px]:w-full flex flex-col gap-1">
            <p className=" text-richblack-5 text-sm font-bold">Gender</p>
            <select
              type="text"
              name="gender"
              className=" bg-richblack-700 text-base p-[0.6rem] rounded-lg shadow-input w-full text-richblack-200 h-[2.825rem] font-semibold"
              {...register("gender")}
              defaultValue={user?.additionalDetails?.gender || ""}
            >
              <option value="" disabled>
                Select Your Gender
              </option>
              {genders.map((ele, i) => {
                return (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <div className="flex gap-4 max-[890px]:flex-col">
          <label className="w-[50%] max-[890px]:w-full flex flex-col">
            <p className=" text-richblack-5 text-sm font-bold flex gap-[0.25rem]">
              Phone Number
              <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
            </p>
            <div className="flex gap-4 items-center">
              <select
                name="countryCode"
                {...register("countryCode", { required: true })}
                className={`bg-richblack-700 w-[5rem] text-base py-1 px-1 text-richblack-200 rounded-lg shadow-input h-[2.825rem] font-semibold
                ${code && code.length === 2 ? "px-5" : ""}
                ${code && code.length === 3 ? "px-4" : ""}
                ${code && code.length === 4 ? "px-[0.7rem]" : ""}
            `}
              >
                {countryCode.map((CountryCode, index) => (
                  <option value={CountryCode.code} key={index}>
                    {CountryCode.code}
                    {" - "}
                    {CountryCode.country}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="contactNumber"
                autoComplete="on"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please Enter Phone Number",
                  },
                  maxLength: { value: 15, message: "Invalid Phone Number" },
                  minLength: { value: 7, message: "Invalid Phone Number" },
                })}
                className="bg-richblack-700 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full h-[2.825rem] font-semibold"
                {...(!user?.additionalDetails?.contactNumber
                  ? { placeholder: "Enter Your Contact Number" }
                  : {
                      defaultValue: user?.additionalDetails?.contactNumber
                        .split(" ")
                        .at(1),
                    })}
              />
            </div>
            {errors.contactNumber && (
              <span className="text-richblack-300 opacity-80 text-sm font-bold mt-1">
                {errors.contactNumber.message}
              </span>
            )}
          </label>

          <label className="w-[50%] max-[890px]:w-full flex flex-col">
            <p className="text-richblack-5 text-sm font-bold flex gap-[0.25rem]">
              About
              <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
            </p>
            <input
              type="text"
              name="about"
              autoComplete="on"
              {...(!user?.additionalDetails?.about
                ? { placeholder: "Enter Your Bio Details" }
                : { defaultValue: user?.additionalDetails?.about })}
              {...register("about", {
                required: {
                  value: true,
                  message: "Please Enter Bio Details",
                },
              })}
              className="bg-richblack-700 text-base p-[0.6rem] rounded-lg font-semibold text-richblack-200 shadow-input w-full h-[2.825rem]"
            />
            {errors.about && (
              <span className="text-richblack-300 opacity-80 text-sm font-bold mt-1">
                {errors.about.message}
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
