import React from "react";
import UpdateDisplayPicture from "./UpdateDisplayPicture";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";

const Settings = () => {

  return (
    <div className="flex flex-col gap-12 text-richblack-5 justify-center">
      <div className="text-3xl font-bold">Edit Profile</div>

      <div className="flex flex-col gap-8 justify-center">
        <UpdateDisplayPicture></UpdateDisplayPicture>

        <EditProfile></EditProfile>

        <ChangePassword></ChangePassword>

        <DeleteProfile></DeleteProfile>
      </div>
    </div>
  );
};

export default Settings;
