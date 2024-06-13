import React from "react";
import logoLightImage from "../../assets/Logo/Logo-Full-Light.png";
import FooterLinks from "../core/HomePage/FooterLinks";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import FooterLink from "../../data/footer-links";
import { NavLink } from "react-router-dom";
import HighlightText from "../core/HomePage/HighlightText";

const Footer = () => {
  return (
    <footer className="py-10 bg-richblack-800">
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col gap-8">
        {/* Top Part */}
        <div className="flex flex-row max-[1140px]:flex-col border-b-[1px] border-richblack-600 pb-7 gap-12 max-[1200px]:gap-6 max-[1140px]:gap-16 max-[595px]:gap-6">
          {/* Left Part */}
          <div className="flex w-[48%] h-fit justify-between max-[1140px]:w-full max-[1140px]:mx-auto max-[1140px]:justify-around max-[595px]:flex-col max-[595px]:gap-6">
            <div className="flex gap-8 max-[595px]:justify-between ">
              {/* First Column */}
              <div className="flex flex-col gap-3">
                <img src={logoLightImage} alt="Logo" loading="lazy"/>
                <FooterLinks
                  title={"Company"}
                  links={[
                    {
                      text: "About",
                      link: "/about",
                    },
                    {
                      text: "Careers",
                      link: "/signup",
                    },
                    {
                      text: "Affiliates",
                      link: "/signup",
                    },
                  ]}
                ></FooterLinks>
                <div className="flex gap-2">
                  <AiFillFacebook className=" text-richblack-500 text-[1.8rem] rounded-[50%] hover:cursor-pointer" />
                  <AiFillGoogleCircle className=" text-richblack-500 text-[1.8rem] hover:cursor-pointer" />
                  <AiFillTwitterCircle className=" text-richblack-500 text-[1.8rem] hover:cursor-pointer" />
                  <AiFillYoutube className=" text-richblack-500 text-[1.8rem] hover:cursor-pointer" />
                </div>
              </div>

              {/* Second Column */}
              <div className="flex flex-col gap-8">
                <FooterLinks
                  title={"Resources"}
                  links={[
                    {
                      text: "Articles",
                      link: "/login",
                    },
                    {
                      text: "Blog",
                      link: "/signup",
                    },
                    {
                      text: "Chart Sheets",
                      link: "/signup",
                    },
                    {
                      text: "Code Challenges",
                      link: "/login",
                    },
                    {
                      text: "Docs",
                      link: "/signup",
                    },
                    {
                      text: "Projects",
                      link: "/signup",
                    },
                    {
                      text: "Videos",
                      link: "/signup",
                    },
                    {
                      text: "Workspaces",
                      link: "/signup",
                    },
                  ]}
                ></FooterLinks>
                <FooterLinks
                  title={"Support"}
                  links={[
                    {
                      text: "Help Center",
                      link: "/contactus",
                    },
                  ]}
                ></FooterLinks>
              </div>
            </div>

            {/* Third Column */}
            <div className="flex flex-col gap-8 text-right max-[595px]:flex-row max-[595px]:justify-between ">
              <FooterLinks
                title={"Plans"}
                links={[
                  {
                    text: "Paid Memberships",
                    link: "/login",
                  },
                  {
                    text: "For Students",
                    link: "/signup",
                  },
                  {
                    text: "Business Solutions",
                    link: "/signup",
                  },
                ]}
              ></FooterLinks>
              <FooterLinks
                title={"Community"}
                links={[
                  {
                    text: "Forums",
                    link: "/login",
                  },
                  {
                    text: "Chapters",
                    link: "/signup",
                  },
                  {
                    text: "Events",
                    link: "/signup",
                  },
                ]}
              ></FooterLinks>
            </div>
          </div>
          {/* Right Part */}
          <div className="flex w-[52%] justify-between pl-12 h-fit gap-20 border-l border-richblack-600 max-[1200px]:pl-6 max-[1200px]:gap-10 max-[1140px]:w-full max-[1140px]:mx-auto max-[1140px]:justify-around max-[1140px]:border-0 max-[1140px]:px-6 max-[595px]:flex-col max-[595px]:px-0 max-[595px]:gap-6">
            <div className=" flex gap-7 max-[1140px]:gap-20 max-[595px]:justify-between">
              {/* First Column */}
              <FooterLinks
                title={FooterLink[0].title}
                links={FooterLink[0].links}
              ></FooterLinks>
              {/* Second Column */}
              <FooterLinks
                title={FooterLink[1].title}
                links={FooterLink[1].links}
                className="mr-100"
              ></FooterLinks>
            </div>
            {/* Third Column */}
            <FooterLinks
              title={FooterLink[2].title}
              links={FooterLink[2].links}
            ></FooterLinks>
          </div>
        </div>

        {/* Bottom Part */}
        <div className="flex justify-between items-center max-[850px]:flex-col max-[850px]:gap-2">
          <div className="flex gap-4 max-[500px]:gap-2 text-richblack-300 items-center text-[0.9rem] opacity-65">
            <NavLink
              to={"/privacy-policy"}
              className="border-r border-richblack-300 pr-4 transition-all duration-200 hover:text-white max-[500px]:pr-2"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to={"/cookie-policy"}
              className="border-r border-richblack-300 pr-4 transition-all duration-200 hover:text-white max-[500px]:pr-2"
            >
              Cookie Policy
            </NavLink>
            <NavLink
              to={"/terms"}
              className="transition-all duration-200 hover:text-white"
            >
              Terms
            </NavLink>
          </div>

          <div className="text-richblack-300 text-center text-[1rem] opacity-65 font-bold ">
            Made By <HighlightText text={"KENIL"}></HighlightText> © 2024 StudyNotion
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
