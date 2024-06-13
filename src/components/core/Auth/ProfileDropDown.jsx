import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";
import { logout } from "../../../services/operations/authAPI";
import { VscDashboard, VscSignOut } from "react-icons/vsc";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropDownRef = useRef(null);

  useOnClickOutside(dropDownRef, () => setIsOpen(false));

  const dropDownHandler = () => {
    setIsOpen(!isOpen);
  };

  if (!user) {
    return null;
  }

  return (
    <div ref={dropDownRef} className="relative select-none">
      <div
        className="flex items-center justify-center gap-1 hover:cursor-pointer"
        onClick={dropDownHandler}
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {isOpen && (
        <div
          className="absolute top-[160%] right-0 divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 text-richblack-5 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <NavLink
            to="/dashboard/my-profile"
            className="hover:bg-richblack-400 hover:cursor-pointer py-3 px-4 w-full flex gap-2 items-center text-lg"
            onClick={() => setIsOpen(false)}
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </NavLink>
          <button
            className="hover:bg-richblack-400 hover:cursor-pointer py-3 px-4 w-full text-start flex gap-2 items-center text-lg"
            onClick={() => {
              dispatch(logout(navigate));
              setIsOpen(false);
            }}
          >
            <VscSignOut className="text-lg" />
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
