import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getResetPasswordToken } from "../services/operations/authAPI";
import { IoIosArrowRoundBack } from "react-icons/io";
import Spinner from "../components/common/Spinner";

const ForgotPasswordToken = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [maskedEmail, setMaskedEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  // for resending email
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer;
    if (emailSent && isTimerRunning) {
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
  }, [isTimerRunning, countdown, emailSent]);

  const startTimer = () => {
    setCountdown(60);
    setIsTimerRunning(true);
  };

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  function maskEmail(email) {
    // Split the email address into local part and domain
    const [localPart, domain] = email.split("@");

    // Get the first three characters of the local part
    const firstThreeCharacters = localPart.slice(0, 3);

    // Calculate the length of characters to be masked
    const numToMask = localPart.length - 5; // Keep 3 characters visible and exclude the first two and last two characters

    // Create the masked local part
    const maskedLocalPart = `${firstThreeCharacters}${"*".repeat(
      numToMask
    )}${localPart.slice(-2)}`;

    // Concatenate the masked local part with the domain
    const maskedEmail = `${maskedLocalPart}@${domain}`;

    return maskedEmail;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(getResetPasswordToken(formData.email, setEmailSent));

    setMaskedEmail(maskEmail(formData.email));
  };

  const resendEmail = (event) => {
    event.preventDefault();
    if (!isTimerRunning) {
      dispatch(getResetPasswordToken(formData.email, setEmailSent));
      startTimer();
    }
  };

  return (
    <div className="text-richblack-5 flex justify-center items-center w-11/12 min-h-[calc(100vh-3.53rem)] max-w-maxContent mx-auto">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flex justify-center items-center w-full">
          {!emailSent ? (
            <div className="w-[28rem] p-4 flex flex-col justify-center gap-5">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-bold max-[380px]:text-2xl">
                  Reset Your Password
                </div>
                <div className=" text-richblack-200 text-md">
                  Have no fear. We'll email you instructions to reset your
                  password. If you don't have access to your email we can try
                  account recovery.
                </div>
              </div>
              <form
                action="submit"
                className="flex flex-col gap-6"
                onSubmit={submitHandler}
              >
                <label>
                  <p className=" text-richblack-5 text-sm flex gap-[0.1rem]">
                    Email Address
                    <sup className="text-pink-200 text-base top-[-0.1rem]">
                      *
                    </sup>
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
                <div className="text-3xl font-bold">Check Email</div>
                <div className=" text-richblack-200 text-md">
                  We have sent the reset email to {`${maskedEmail}`}
                </div>
              </div>
              <button
                className={`px-5 py-2 bg-yellow-50 rounded-lg text-black font-bold
                ${
                  isTimerRunning
                    ? "hover:cursor-wait"
                    : "hover:cursor-pointer"
                }
                `}
                onClick={resendEmail}
              >
                Resend Email {countdown !== 0 && ` (${countdown}s)`}
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

export default ForgotPasswordToken;
