import React from "react";
import Template from "../components/core/Auth/Template";
import signUpImage from "../assets/Images/signup.webp";
import HighlightText from "../components/core/HomePage/HighlightText";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";

const SignUp = () => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="w-11/12 max-w-maxContent mx-auto flex justify-center">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Template
          title={
            <div className="text-3xl font-bold max-[480px]:text-2xl">
              Join the millions learning to code with{" "}
              <HighlightText text={"StudyNotion"}></HighlightText> for free
            </div>
          }
          desc1={"Build skills for today, tomorrow, and beyond."}
          desc2={"Education to future-proof your career."}
          formType="signup"
          image={signUpImage}
        ></Template>
      )}
    </div>
  );
};

export default SignUp;
