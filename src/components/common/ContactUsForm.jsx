import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import countryCode from "../../data/countrycode.json";

const ContactUsForm = (props) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      countryCode: "+91", // Set your default value here
    },
  });

  const code = watch("countryCode"); // Watch for changes to the countryCode field

  const submitForm = async (data) => {
    data.contactNumber = data.countryCode + " " + data.contactNumber;
    console.log("Contact Us Form Data -> ", data);

    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      console.log("Contact Us API Response -> ", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Message Sent Successfully");
    } catch (error) {
      console.log("Could not Send Data -> ", error);
      toast.error("Could Not Send Message");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        countryCode: "+91",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return loading ? (
    <div className="my-12">
      <Spinner height={"h-96"}></Spinner>
    </div>
  ) : (
    <form
      action="submit"
      onSubmit={handleSubmit(submitForm)}
      className={`flex flex-col gap-6 
          ${props.width ? `${props.width}` : "max-w-[443.2px]"}
      `}
    >
      <div
        className={`flex gap-4 
          ${props.width ? "max-[920px]:flex-col" : "max-[451px]:flex-col"}
      `}
      >
        <label
          className={`w-[50%] 
            ${props.width ? "max-[920px]:w-full" : "max-[451px]:w-full"}
        `}
        >
          <p className="text-richblack-5 text-sm flex gap-[0.1rem]">
            First Name
            <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
          </p>
          <input
            type="text"
            placeholder="Enter Your FirstName"
            name="firstName"
            autoComplete="on"
            {...register("firstName", { required: true })}
            className=" bg-richblack-800 text-base p-[0.6rem] rounded-lg shadow-input w-full text-richblack-200"
          />
          {errors.firstName && (
            <span className="text-richblack-300 opacity-80 text-sm font-bold">
              Please Enter Your First Name
            </span>
          )}
        </label>

        <label
          className={`w-[50%] 
          ${props.width ? "max-[920px]:w-full" : "max-[451px]:w-full"}`}
        >
          <p className="text-richblack-5 text-sm h-6">Last Name</p>
          <input
            type="text"
            placeholder="Enter Your LastName"
            name="lastName"
            autoComplete="on"
            {...register("lastName")}
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
          autoComplete="on"
          {...register("email", { required: true })}
          className=" bg-richblack-800 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full"
        />
        {errors.email && (
          <span className="text-richblack-300 opacity-80 text-sm font-bold">
            Please Enter Your Email Address
          </span>
        )}
      </label>

      <label>
        <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
          Phone Number
          <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
        </p>
        <div className="flex gap-4 items-center">
          <select
            name="countryCode"
            {...register("countryCode", { required: true })}
            className={`bg-richblack-800 w-[5rem] text-base py-1 px-1 text-richblack-200 rounded-lg shadow-input h-[2.7rem]
              ${code.length === 2 ? "px-5" : ""}
              ${code.length === 3 ? "px-4" : ""}
              ${code.length === 4 ? "px-[0.7rem]" : ""}
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
            placeholder="1234567890"
            name="contactNumber"
            autoComplete="on"
            {...register("contactNumber", {
              required: { value: true, message: "Please Enter Phone Number" },
              maxLength: { value: 15, message: "Invalid Phone Number" },
              minLength: { value: 7, message: "Invalid Phone Number" },
            })}
            className="bg-richblack-800 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full"
          />
        </div>
        {errors.contactNumber && (
          <span className="text-richblack-300 opacity-80 text-sm font-bold">
            {errors.contactNumber.message}
          </span>
        )}
      </label>

      <label>
        <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
          Message
          <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
        </p>
        <textarea
          type="text"
          placeholder="Enter Your Message"
          name="message"
          autoComplete="on"
          {...register("message", { required: true })}
          className="h-auto bg-richblack-800 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full min-h-28 resize-none overflow-hidden"
        />
        {errors.message && (
          <span className="text-richblack-300 opacity-80 text-sm font-bold">
            Please Enter Your Message
          </span>
        )}
      </label>

      <button
        className="px-5 py-2 bg-yellow-50 rounded-lg text-black font-bold"
        type="submit"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
