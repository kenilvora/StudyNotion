import React from "react";
import ContactUsForm from "../../common/ContactUsForm";

const GetInTouchForm = () => {
  return (
    <div className="w-11/12 text-richblack-5 max-w-maxContent mx-auto flex flex-col gap-12 items-center justify-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="text-3xl font-bold text-center">Get In Touch</div>
        <div className=" text-richblack-300 text-sm font-bold text-center">We'd love to here for you, Please fill out this form.</div>
      </div>
      <ContactUsForm></ContactUsForm>
    </div>
  );
};

export default GetInTouchForm;
