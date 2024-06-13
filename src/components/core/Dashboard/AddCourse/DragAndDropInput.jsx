import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SlCloudUpload } from "react-icons/sl";
import toast from "react-hot-toast";
import "video-react/dist/video-react.css";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

const DragAndDropInput = ({
  name,
  register,
  setValue,
  errors,
  video,
  label,
  clearErrors,
  view = false,
  edit = false,
  data = null,
}) => {
  const [previewFileSrc, setPreviewFileSrc] = useState(
    view ? data : edit ? data : null
  );
  const [selectedFile, setSelectedFile] = useState(
    view ? data : edit ? data : null
  );
  const inputRef = useRef(null);
  const { editCourse, course } = useSelector((state) => state.course);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewFileSrc(reader.result);
    };
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    } else {
      toast.error("Invalid file");
    }
  }, []);

  useEffect(() => {
    if (editCourse && !video) {
      setPreviewFileSrc(course?.thumbnail);
      setSelectedFile(course?.thumbnail);
    }
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    noClick: true,
  });

  return (
    <label className="flex flex-col gap-2 w-full">
      <p className="text-richblack-5 text-sm flex gap-[0.1rem]">
        {label}
        <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
      </p>
      <div
        className={`border-2 border-dashed rounded-lg text-center bg-richblack-700 cursor-pointer min-h-[196px]
          ${
            isDragActive
              ? "border-yellow-100 opacity-55"
              : "border-richblack-600"
          }
      `}
      >
        {previewFileSrc ? (
          <div className="flex p-3 flex-col gap-3 justify-center items-center">
            {video ? (
              <ReactPlayer
                playsinline={true}
                controls={true}
                url={previewFileSrc}
                width="100%"
                height="100%"
              />
            ) : (
              <img
                src={previewFileSrc}
                alt="uploadedFile"
                className="object-cover rounded-lg"
              />
            )}
            {!view && (
              <div
                className="text-richblack-300 font-bold opacity-65 hover:pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  setPreviewFileSrc(null);
                  setSelectedFile(null);
                  setValue(name, null);
                }}
              >
                Cancel
              </div>
            )}
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`flex w-full min-h-[196px] flex-col items-center justify-center`}
          >
            <input ref={inputRef} {...getInputProps()} />
            {isDragActive ? (
              <p className="p-2 w-full h-full flex justify-center items-center">
                Drop the files here...
              </p>
            ) : (
              <div className="flex items-center flex-col gap-4 w-full p-2">
                <div className="rounded-full bg-pure-greys-800 flex justify-center items-center text-yellow-50 font-black p-3 w-fit text-2xl">
                  <SlCloudUpload></SlCloudUpload>
                </div>
                <div className="flex flex-col gap-1 text-sm text-richblack-200">
                  <div>
                    Drag and drop an image, or{" "}
                    <span className="font-bold text-yellow-100">Browse</span>
                  </div>
                  <div>Max 6MB each (12MB for videos)</div>
                </div>
                <ul className="flex max-[470px]:flex-col max-[470px]:w-full justify-between text-xs w-[70%] max-[1100px]:w-[90%] text-richblack-200 list-disc max-[1100px]:list-inside font-bold">
                  <li>Aspect Ratio 16:9</li>
                  <li>Recommended size 1024x576</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="text-richblack-300 opacity-80 text-sm font-bold">
          {video
            ? "Please Select Lecture Video"
            : "Please Select Course Thumbnail"}
        </span>
      )}
    </label>
  );
};

export default DragAndDropInput;
