import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/profileAPI";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-hot-toast";

const UpdateDisplayPicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [newImageFile, setNewImageFile] = useState(null);
  const [previewFileSrc, setPreviewFileSrc] = useState(null);

  const dispatch = useDispatch();

  const imageChangeHandler = (event) => {
    const file = event.target.files;
    if (file.length > 0) {
      setNewImageFile(file[0]);
      previewFile(file[0]);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewFileSrc(reader.result);
    };
  };

  const imageUploader = (event) => {
    event.preventDefault();

    if (newImageFile) {
      const formData = new FormData();
      formData.append("displayPicture", newImageFile);

      dispatch(updateDisplayPicture(formData, token)).then(() => {
        setNewImageFile(null);
        setPreviewFileSrc(null);
      });
    } else {
      toast.error("Please select a file before uploading...");
    }
  };

  return (
    <div className="flex gap-4 bg-richblack-800 rounded-lg border border-richblack-600 px-10 py-8 max-[500px]:p-5 max-[500px]:gap-2">
      <img
        src={previewFileSrc || user?.image}
        alt={`profile-${user?.firstName}`}
        className="h-[4.5rem] max-[500px]:h-[3.8rem] aspect-square rounded-full object-cover"
      />
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold max-[500px]:text-base">
          Change Profile Picture
        </div>
        <div className="flex gap-3 items-center">
          <label className="px-5 max-[500px]:px-2 hover:cursor-pointer py-1.5 text-lg max-[500px]:text-sm font-bold bg-richblack-700 rounded-md bg-opacity-70 border border-richblack-600">
            <span>Select</span>
            <input
              type="file"
              className="hidden"
              onChange={imageChangeHandler}
              accept="image/png, image/gif, image/jpeg"
            />
          </label>
          <button
            className=" bg-yellow-100 px-4 max-[500px]:px-2 py-1.5 flex items-center rounded-md text-black font-bold gap-2 text-lg max-[500px]:text-sm border border-yellow-5"
            onClick={imageUploader}
          >
            Upload
            <FiUpload></FiUpload>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateDisplayPicture;
