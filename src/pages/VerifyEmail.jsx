import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import OTPInput from "react-otp-input";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TfiTimer } from "react-icons/tfi";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  // for resending otp email
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            setIsTimerRunning(false); // Enable button after countdown ends
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, countdown]);

  const startTimer = () => {
    setCountdown(60);
    setIsTimerRunning(true);
  };

  const resendItHandler = (event) => {
    event.preventDefault();
    if (!isTimerRunning) {
      dispatch(sendOtp(signupData.email));
      startTimer();
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="flex justify-center items-center w-11/12 min-h-[calc(100vh-3.53rem)] max-w-maxContent mx-auto text-richblack-5">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="w-[29rem] p-4 flex flex-col justify-center gap-5">
          <div className="flex flex-col gap-2">
            <div className="text-3xl font-bold">Verify Email</div>
            <div className=" text-richblack-200 text-md">
              A verification code has been sent to you. Enter the code below
            </div>
          </div>

          <form
            action="submit"
            className="flex flex-col gap-6"
            onSubmit={submitHandler}
          >
            <OTPInput
              value={otp}
              numInputs={6}
              onChange={setOtp}
              renderInput={(props, index) => (
                <input
                  {...props}
                  placeholder="-"
                  className={`bg-richblack-800 text-base font-bold font-edu-sa caret-richblack-25 shadow-input2 w-1/6
                      ${
                        index === 0
                          ? "mr-2 ml-0 max-[460px]:mr-1 max-[460px]:ml-0"
                          : "mx-2 max-[460px]:mx-1"
                      }
                      ${
                        index === 5
                          ? "ml-2 mr-0 max-[460px]:ml-1 max-[460px]:mr-0"
                          : "mx-2 max-[460px]:mx-1"
                      }
                      rounded-lg text-center py-2.5 text-lg max-[370px]:py-2 max-[340px]:py-1.5
                  `}
                  autoComplete="off"
                  id={`otp-input${index}`}
                  style={{
                    color: "white",
                  }}
                />
              )}
            ></OTPInput>

            <button className="px-5 py-2 bg-yellow-50 rounded-lg text-black font-bold">
              Verify Email
            </button>
          </form>

          <div className="flex justify-between">
            <NavLink
              to={"/login"}
              className="hover:cursor-pointer flex gap-1 items-center hover:text-yellow-50"
            >
              <IoIosArrowRoundBack className="text-2xl"></IoIosArrowRoundBack>
              Back to Login
            </NavLink>

            <button
              className={`flex gap-1 items-center
                ${
                  isTimerRunning
                    ? "hover:cursor-wait text-richblack-500"
                    : "hover:cursor-pointer text-richblack-5 hover:text-yellow-50"
                }
              
            `}
              onClick={resendItHandler}
            >
              <TfiTimer></TfiTimer>
              Resend it
              {countdown !== 0 && ` (${countdown}s)`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
