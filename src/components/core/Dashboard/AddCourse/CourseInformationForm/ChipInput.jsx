import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ChipInput = ({
  name,
  register,
  setValue,
  getValues,
  errors,
  clearErrors,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setTags(course?.tag);
    }
    register(name, { required: true });
  }, []);

  useEffect(() => {
    setValue(name, tags);
  }, [tags]);

  const handleKeyDown = (event) => {
    if (event.key === "," || event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of the Enter key
      event.stopPropagation();
      const tagValue = event.target.value.trim();
      if (tagValue && !tags.includes(tagValue)) {
        setTags([...tags, tagValue]);
      } else if (tags.includes(tagValue)) {
        toast.error("Tag Already Included");
      }
      event.target.value = "";
    }
  };

  const removeTag = (event, index) => {
    event.preventDefault();
    const tag = [...tags];
    tag.splice(index, 1);
    setTags(tag);
  };

  return (
    <div className="flex flex-col gap-2">
      <label>
        <p className="text-richblack-5 text-sm flex gap-[0.1rem]">
          Tags
          <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
        </p>
        <input
          type="text"
          placeholder="Enter Tag and press ' , ' or Enter"
          name={name}
          autoComplete="on"
          onKeyDown={handleKeyDown}
          className="bg-richblack-700 text-base p-[0.6rem] resize-none rounded-lg text-richblack-200 shadow-input w-full"
        />
        {errors[name] && (
          <span className="text-richblack-300 opacity-80 text-sm font-bold">
            Please Enter Course Tags
          </span>
        )}
      </label>
      {tags.length > 0 && (
        <div className="flex gap-3 w-full flex-wrap">
          {tags.map((tag, index) => {
            return (
              <div
                className="bg-yellow-100 flex justify-center items-center text-richblack-800 font-semibold font-sm rounded-full px-3 py-0.5 gap-2"
                key={index}
              >
                {tag}
                <RxCross2
                  className="hover:cursor-pointer"
                  onClick={(event) => removeTag(event, index)}
                ></RxCross2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChipInput;
