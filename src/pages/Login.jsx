import React from "react";
import Template from "../components/core/Auth/Template";
import loginImage from "../assets/Images/login.webp";
import HighlightText from "../components/core/HomePage/HighlightText";
import Spinner from "../components/common/Spinner";
import { useSelector } from "react-redux";

const Login = () => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="w-11/12 max-w-maxContent mx-auto flex justify-center">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Template
          title={
            <div className="text-3xl font-bold max-[480px]:text-2xl">
              <HighlightText
                text={"Welcome Back to StudyNotion"}
              ></HighlightText>
              {" "}- Your Learning Journey Awaits
            </div>
          }
          desc1={"Build skills for today, tomorrow, and beyond."}
          desc2={"Education to future-proof your career."}
          formType="login"
          image={loginImage}
        ></Template>
      )}
    </div>
  );
};

export default Login;
