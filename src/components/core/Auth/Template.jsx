import React from "react";
import SignUpForm from "./SignUpForm";
import frame from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";

const Template = (props) => {
  return (
    <div
      className={`flex my-20 text-white justify-between
        ${
          props.formType === "signup"
            ? "max-[1000px]:flex-col-reverse max-[1000px]:gap-12"
            : " max-[700px]:flex-col-reverse max-[700px]:gap-12"
        }
        min-h-[calc(100vh-13.53rem)]
    `}
    >
      <div
        className={`flex flex-col gap-8 w-[45%]
          ${
            props.formType === "signup"
              ? "max-[1000px]:w-full"
              : "max-[700px]:w-full"
          }
        justify-center mx-auto`}
      >
        <div className="flex flex-col justify-center gap-2">
          {props.title}
          <div className=" text-richblack-300 text-sm font-semibold">
            {props.desc1}{" "}
            <span className="text-blue-100 font-edu-sa bg-opacity-100">
              {props.desc2}
            </span>
          </div>
        </div>
        <div>
          {props.formType === "signup" ? (
            <SignUpForm></SignUpForm>
          ) : (
            <LoginForm></LoginForm>
          )}
        </div>
      </div>
      <div
        className={`relative flex w-[45%]
          ${
            props.formType === "signup"
              ? "max-[1000px]:w-full"
              : "max-[700px]:w-full"
          }
        justify-center mx-auto`}
      >
        <img
          src={frame}
          alt="BackGroundFrame"
          className="absolute object-contain h-full w-full top-5 left-5 max-[630px]:top-3 max-[630px]:left-3 max-[400px]:top-2 max-[400px]:left-2 max-[300px]:top-1 max-[300px]:left-1"
          loading="lazy"
        />
        <img
          src={props.image}
          alt="MainImage"
          className="relative object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Template;
