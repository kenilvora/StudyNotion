import React from "react";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import * as IC from "react-icons/tb";
import { PiShoppingCartBold } from "react-icons/pi";

const SidebarLink = ({ link }) => {
  const Icon =
    link.name === "Catalog" ? IC[link.icon] : link.icon ? Icons[link.icon] : "";
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`flex group max-[835px]:flex-col py-2 font-bold text-richblack-300 gap-2 items-center px-5 max-[835px]:px-2 max-[835px]:justify-center
            ${
              matchRoute(link.path)
                ? `bg-yellow-800 text-yellow-50 min-[835px]:border-l-[3px] 
                    max-[835px]:border-t-[3px] border-yellow-50`
                : ""
            }
    `}
    >
      {link.icon ? (
        <Icon className="text-lg max-[535px]:text-3xl max-[410px]:text-2xl"></Icon>
      ) : (
        <PiShoppingCartBold className="text-lg max-[535px]:text-3xl max-[410px]:text-2xl"></PiShoppingCartBold>
      )}
      <div
        className="max-[660px]:text-sm max-[600px]:text-xs max-[535px]:absolute max-[535px]:hidden max-[535px]:group-hover:flex max-[535px]:bg-richblack-500 max-[535px]:bottom-14 
      max-[535px]:p-2 max-[535px]:rounded-lg max-[535px]:font-black max-[535px]:text-white 
      max-[535px]:text-base max-[410px]:text-sm"
      >
        {link.name}
      </div>
    </NavLink>
  );
};

export default SidebarLink;
