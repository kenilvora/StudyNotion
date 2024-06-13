import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const [formatedDate, setFormatedDate] = useState(null);

  const navigate = useNavigate();

  const editBtnHandler = () => {
    navigate("/dashboard/settings");
  };

  function getFormatedDate() {
    if (user?.additionalDetails?.dateOfBirth) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Create a Date object from the date string
      const date = new Date(user.additionalDetails.dateOfBirth);

      // Get the month index (0-11)
      const monthIndex = date.getMonth();
      const date_year =
        user.additionalDetails.dateOfBirth.split("-").at(1) +
        " " +
        user.additionalDetails.dateOfBirth.split("-").at(0);

      setFormatedDate(`${monthNames[monthIndex]} ${date_year}`);
    }
  }

  useEffect(() => {
    getFormatedDate();
  }, []);

  return (
    <div className="flex flex-col gap-12 text-richblack-5 justify-center">
      <div className="text-3xl font-bold">My Profile</div>

      <div className="flex flex-col gap-8 justify-center">
        <div className="flex justify-between bg-richblack-800 rounded-lg border border-richblack-600 items-center px-10 py-7 max-[500px]:items-start max-[500px]:p-5">
          <div className="flex gap-3 max-[500px]:flex-col">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="w-[4.5rem] aspect-square rounded-full object-cover"
            />
            <div className="flex flex-col justify-center">
              <div className="text-lg font-bold">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-richblack-300">{user?.email}</div>
            </div>
          </div>

          <button
            className="bg-yellow-100 flex gap-2 px-4 py-1.5 border-l-2 border-richblack-25 text-black font-bold rounded-md relative max-[400px]:right-6"
            onClick={editBtnHandler}
          >
            <div>Edit</div>
            <FiEdit className="relative top-[0.2rem]"></FiEdit>
          </button>
        </div>

        <div className="flex flex-col justify-between bg-richblack-800 rounded-lg border border-richblack-600 gap-6 px-10 py-7 max-[500px]:p-5">
          <div className="flex justify-between">
            <div className="font-bold text-lg">About</div>
            <button
              className="bg-yellow-100 flex gap-2 px-4 py-1.5 border-l-2 border-richblack-25 text-black font-bold rounded-md"
              onClick={editBtnHandler}
            >
              <div>Edit</div>
              <FiEdit className="relative top-[0.2rem]"></FiEdit>
            </button>
          </div>

          <div
            className={`font-bold
              ${
                user?.additionalDetails?.about
                  ? ""
                  : "text-richblack-300 opacity-80"
              }
          `}
          >
            {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </div>
        </div>

        <div className="flex flex-col gap-6 justify-center bg-richblack-800 rounded-lg border border-richblack-600 px-10 py-7 max-[500px]:p-5">
          <div className="flex justify-between">
            <div className="font-bold text-lg">Personal Details</div>
            <button
              className="bg-yellow-100 flex gap-2 px-4 py-1.5 border-l-2 border-richblack-25 text-black font-bold rounded-md"
              onClick={editBtnHandler}
            >
              <div>Edit</div>
              <FiEdit className="relative top-[0.2rem]"></FiEdit>
            </button>
          </div>

          <div className="flex flex-col gap-5 max-w-[70%] max-[1000px]:max-w-[85%] max-[835px]:max-w-full">
            <div className="flex justify-between max-[500px]:flex-col max-[500px]:gap-5">
              <div className="flex flex-col gap-1">
                <div className="text-richblack-300 opacity-80">First Name</div>
                <div className="font-bold">{user?.firstName}</div>
              </div>
              <div className="flex flex-col gap-1 w-[160px]">
                <div className="text-richblack-300 opacity-80">Last Name</div>
                <div className="font-bold">{user?.lastName}</div>
              </div>
            </div>
            <div className="flex justify-between max-[500px]:flex-col max-[500px]:gap-5">
              <div className="flex flex-col gap-1">
                <div className="text-richblack-300 opacity-80">Email</div>
                <div className="font-bold">{user?.email}</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-richblack-300 opacity-80 w-[160px]">
                  Phone Number
                </div>
                <div className="font-bold">
                  {user?.contactNumber ?? "Add Contact Number"}
                </div>
              </div>
            </div>
            <div className="flex justify-between max-[500px]:flex-col max-[500px]:gap-5">
              <div className="flex flex-col gap-1">
                <div className="text-richblack-300 opacity-80">Gender</div>
                <div className="font-bold">
                  {user?.additionalDetails?.gender !== ""
                    ? user?.additionalDetails?.gender
                    : "Add Gender"}
                </div>
              </div>
              <div className="flex flex-col gap-1 w-[160px]">
                <div className="text-richblack-300 opacity-80">
                  Date Of Birth
                </div>
                <div className="font-bold">
                  {formatedDate ?? "Add Date Of Birth"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
