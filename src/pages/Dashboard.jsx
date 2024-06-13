import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { editCourse } = useSelector((state) => state.course);
  const location = useLocation();

  if (authLoading || profileLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.53rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.53rem)] w-full overflow-auto flex-1">
        <div className="w-11/12 max-w-[1000px] mx-auto text-richblack-300 pt-10 text-lg">
          <NavLink
            className="hover:underline hover:text-richblack-100"
            to={"/"}
          >
            Home
          </NavLink>{" "}
          <span className="mx-1">{`  /`}</span> Dashboard
          <span className="mx-1">{`  / `}</span>
          <span className="font-bold capitalize text-yellow-50">
            {location.pathname.split("/").at(-2) === "edit-course"
              ? "Edit Course"
              : location.pathname.split("/").at(-1).replace("-", " ")}
          </span>
        </div>

        <div className="w-11/12 max-w-[1000px] mx-auto py-10 max-[835px]:mb-14">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
