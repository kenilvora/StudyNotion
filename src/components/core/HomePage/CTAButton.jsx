import React from "react";
import { NavLink } from "react-router-dom";

const CTAButton = ({ children, active, linkto }) => {
  return (
    <NavLink to={linkto}>
      <div
        className={`text-center text-[16px] rounded-lg px-5 py-3 font-bold max-[600px]:px-4 max-[372px]:px-2
            ${
              active
                ? "bg-yellow-100 text-black shadow-yellow1"
                : "bg-richblack-800 shadow-black3"
            } transition-all duration-200 hover:scale-95
        `}
      >
        {children}
      </div>
    </NavLink>
  );
};

export default CTAButton;
