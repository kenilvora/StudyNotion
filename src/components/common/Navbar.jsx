import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import NavbarLinks from "../../data/navbar-links";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { categories } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";
import { IoMenu } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { GrCatalogOption } from "react-icons/gr";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const cartData = useSelector((state) => state.cart);
  const location = useLocation();

  const [categoryLinks, setCategoryLinks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

  const getCategories = async () => {
    try {
      setLoading(true);
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setCategoryLinks(result.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Could not Fetch the Category List ", error);
    }
  };

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="border-b min-h-[56px] bg-richblack-800 border-richblack-700 flex items-center justify-center select-none max-[420px]:min-h-14">
      <div className="flex justify-between w-11/12 max-w-maxContent mx-auto items-center max-[835px]:py-2">
        <div className="flex gap-2 justify-center items-center max-[420px]:gap-1">
          <div
            className="text-richblack-25 w-fit hidden max-[835px]:block"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            ref={menuRef}
          >
            {isMenuOpen ? (
              <RxCross2 className=" text-3xl hover:cursor-pointer max-[350px]:text-2xl"></RxCross2>
            ) : (
              <IoMenu className="text-3xl hover:cursor-pointer max-[350px]:text-2xl"></IoMenu>
            )}
            {isMenuOpen && (
              <nav className="flex flex-col gap-3 text-lg text-richblack-900 z-50 py-4 absolute bg-richblack-5 rounded-md top-14  max-[380px]:text-[0.9rem] max-[380px]:leading-4">
                {NavbarLinks.map((navLink, index) => {
                  return navLink.title === "Catalog" ? (
                    <div
                      key={index}
                      className="group px-4 hover:text-yellow-700 hover:cursor-pointer hover:font-bold flex select-none relative"
                    >
                      <div
                        className={`flex gap-2 items-center`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsCatalogOpen(!isCatalogOpen);
                        }}
                      >
                        <GrCatalogOption></GrCatalogOption>
                        <p className="flex gap-1 items-center">
                          {navLink.title}
                          <FaChevronRight></FaChevronRight>
                        </p>
                      </div>

                      <div
                        className={`hidden z-50 absolute
                          ${isCatalogOpen ? "block" : "hidden"}
                          group-hover:block
                      `}
                      >
                        <div
                          className={`w-[2rem] h-[2rem] max-[380px]:w-[1.5rem] max-[380px]:h-[1.5rem] bg-richblack-25 absolute rounded-sm rotate-45 left-[8.57rem] -top-0.5 max-[380px]:left-[7.12rem] max-[380px]:-top-1
                            ${
                              loading
                                ? "rounded-[0.11rem] max-[380px]:rounded-[0.14rem]"
                                : ""
                            }
                        `}
                        ></div>
                        <div
                          className={`flex flex-col py-2 px-2 bg-richblack-25  absolute rounded-md left-[9.45rem] -top-14 max-[380px]:left-[7.75rem] max-[380px]:-top-[2.75rem] w-56 max-[440px]:w-40 max-[340px]:w-36
                            ${
                              loading
                                ? "text-center -top-[0.5rem] left-[9.5rem] rounded-l-[0.1rem] rounded-r-md max-[380px]:rounded-l-[0.05rem] max-[380px]:left-[7.8rem] max-[380px]:-top-2"
                                : ""
                            }
                        `}
                        >
                          {loading ? (
                            <div className="text-richblack-700 font-bold">
                              Loading...
                            </div>
                          ) : (
                            categoryLinks.map((category, index) => {
                              return (
                                <NavLink
                                  to={`/catalog/${category.name
                                    .toLowerCase()
                                    .replace(" ", "-")
                                    .replace("/", "_")}`}
                                  key={index}
                                  className="text-richblack-700 py-3 px-3 max-[440px]:text-sm hover:bg-richblack-200 rounded-md max-[340px]:text-[0.85rem] max-[440px]:p-[0.5rem] max-[440px]:px-1"
                                >
                                  {category.name}
                                </NavLink>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={navLink?.path}
                      key={index}
                      className={`flex gap-2 items-center hover:text-yellow-700 px-4
                        ${
                          matchRoute(navLink?.path)
                            ? "text-yellow-700 font-bold"
                            : ""
                        }
                `}
                    >
                      {navLink.title === "Home" && <IoHome></IoHome>}
                      {navLink.title === "About Us" && (
                        <BsFillInfoSquareFill></BsFillInfoSquareFill>
                      )}
                      {navLink.title === "Contact Us" && <MdEmail></MdEmail>}
                      {navLink.title}
                    </NavLink>
                  );
                })}
              </nav>
            )}
          </div>
          <NavLink to={"/"}>
            <img
              src={logo}
              alt="Logo"
              className="w-[10rem] max-[420px]:w-[9rem] max-[350px]:w-[8rem]"
            />
          </NavLink>
        </div>

        <nav className="flex gap-6 text-richblack-25 max-[770px]:gap-3 max-[835px]:hidden">
          {NavbarLinks.map((navLink, index) => {
            return navLink.title === "Catalog" ? (
              <div
                key={index}
                className="group py-4 hover:text-yellow-50 hover:cursor-pointer flex items-center select-none relative"
              >
                <p
                  className={`flex gap-1 items-center relative transition-all duration-200 group-hover:scale-110`}
                >
                  {navLink.title}
                  <IoIosArrowDown className="opacity-100 group-hover:opacity-0"></IoIosArrowDown>
                  <IoIosArrowUp className="absolute right-0 opacity-0 group-hover:opacity-100"></IoIosArrowUp>
                </p>

                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 z-50 absolute top-10 transition-all duration-200">
                  <div className="w-[2rem] h-[2rem] bg-richblack-25 absolute rounded-sm rotate-45 left-[3.39rem] top-2"></div>
                  <div
                    className={`flex flex-col py-3 px-2 bg-richblack-25 text-md w-72 absolute top-4 rounded-md -left-32
                      ${loading ? "text-center" : ""}
                  `}
                  >
                    {loading ? (
                      <div className="text-richblack-700 font-bold">
                        Loading...
                      </div>
                    ) : (
                      categoryLinks.map((category, index) => {
                        return (
                          <NavLink
                            to={`/catalog/${category.name
                              .toLowerCase()
                              .replace(" ", "-")
                              .replace("/", "_")}`}
                            key={index}
                            className="text-richblack-700 py-3 px-5 font-bold text-lg hover:bg-richblack-200 rounded-md"
                          >
                            {category.name}
                          </NavLink>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                to={navLink?.path}
                key={index}
                className={`flex gap-1 items-center hover:text-yellow-50
                        ${
                          matchRoute(navLink?.path)
                            ? "text-yellow-50 font-bold"
                            : ""
                        }
                `}
              >
                {navLink.title}
              </NavLink>
            );
          })}
        </nav>

        {/* Login / SignUp / Profile / Dashboard / SerchIcon / CartIcon */}
        <div className="flex gap-4 justify-center items-center">
          {user && user?.accountType === "Student" && (
            <NavLink
              to={"/dashboard/cart"}
              className="relative text-richblack-25  hover:text-yellow-100"
            >
              <PiShoppingCartBold className="text-2xl" />
              {cartData.totalItems > 0 && (
                <span className="absolute text-xs w-4 h-4 text-center rounded-full animate-bounce text-white bg-yellow-400 -top-1 -right-2">
                  {cartData.totalItems}
                </span>
              )}
            </NavLink>
          )}

          {token === null && (
            <div className="text-richblack-25 flex gap-4 max-[770px]:gap-2">
              <NavLink
                to={"/login"}
                className="px-4 py-2 max-[420px]:px-2 max-[420px]:py-1 max-[420px]:text-sm bg-richblack-800 shadow-black4 rounded-md transition-all duration-200 hover:scale-95"
              >
                Login
              </NavLink>
              <NavLink
                to={"/signup"}
                className="px-4 py-2 max-[420px]:px-2 max-[420px]:py-1 max-[420px]:text-sm bg-richblack-800 shadow-black4 rounded-md transition-all duration-200 hover:scale-95"
              >
                Sign Up
              </NavLink>
            </div>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
