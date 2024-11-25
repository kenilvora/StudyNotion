import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import Spinner from "../../common/Spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (authLoading || profileLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <div className="bg-richblack-800 max-[835px]:hidden min-w-[220px] flex flex-col py-8 h-[calc(100vh-3.53rem])] border-r border-richblack-600">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && link.type !== user?.accountType) {
              return null;
            }
            return <SidebarLink link={link} key={link.id}></SidebarLink>;
          })}
        </div>
        <div className="h-1 border-t border-richblack-600 w-[90%] flex justify-center mx-auto mt-[18.2px] mb-2"></div>
        <div className="flex flex-col">
          <SidebarLink
            link={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: "VscSettingsGear",
            }}
          ></SidebarLink>

          <button
            className={`flex py-2 font-bold text-richblack-300 gap-2 items-center px-5`}
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure?",
                text2: "You will be logged out of your Account.",
                btn1: "Log Out",
                btn2: "Cancel",
                btn1Handler: () => {
                  dispatch(logout(navigate));
                },
                btn2Handler: () => {
                  setConfirmationModal(null);
                },
              })
            }
          >
            <VscSignOut className="text-lg"></VscSignOut>
            <div>Log Out</div>
          </button>
        </div>
      </div>
      <div className="min-[835px]:hidden text-white relative">
        <div className="absolute -bottom-0.5 w-screen flex justify-between bg-richblack-600 z-50 gap-1 px-8">
          <div className="flex justify-between w-full">
            {sidebarLinks.map((link) => {
              if (link.type && link.type !== user.accountType) {
                return null;
              }
              return <SidebarLink link={link} key={link.id}></SidebarLink>;
            })}

            <SidebarLink
              link={{
                name: "Settings",
                path: "/dashboard/settings",
                icon: "VscSettingsGear",
              }}
            ></SidebarLink>

            <button
              className={`flex flex-col py-2 group font-bold text-richblack-300 gap-2 items-center px-2 justify-center`}
              onClick={() =>
                setConfirmationModal({
                  text1: "Are You Sure?",
                  text2: "You will be logged out of your Account.",
                  btn1: "Log Out",
                  btn2: "Cancel",
                  btn1Handler: () => {
                    dispatch(logout(navigate));
                  },
                  btn2Handler: () => {
                    setConfirmationModal(null);
                  },
                })
              }
            >
              <VscSignOut className="text-lg max-[535px]:text-3xl max-[410px]:text-2xl"></VscSignOut>
              <div className="max-[660px]:text-sm max-[600px]:text-xs max-[535px]:absolute max-[535px]:hidden max-[535px]:group-hover:flex max-[535px]:bg-richblack-500 max-[535px]:bottom-14 max-[535px]:p-2 max-[535px]:rounded-lg max-[535px]:font-black max-[535px]:text-white max-[535px]:text-base max-[410px]:text-sm">
                Log Out
              </div>
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && (
        <ConfirmationModal data={confirmationModal}></ConfirmationModal>
      )}
    </>
  );
};

export default Sidebar;
