import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CourseInstructionInput = ({
  name,
  register,
  setValue,
  getValues,
  errors,
  clearErrors,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);

  const [instructions, setInstructions] = useState([]);
  const [oneRequirement, setOneRequirement] = useState("");

  const addInstructionHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const instructionValue = oneRequirement.trim();
    if (instructionValue && !instructions.includes(instructionValue)) {
      setInstructions([...instructions, instructionValue]);
    } else if (instructions.includes(instructionValue)) {
      toast.error("Instruction Already Included");
    }
    setOneRequirement(""); // Clear the input
  };

  const removeInstructionHandler = (event, index) => {
    event.preventDefault();
    const inst = [...instructions];
    inst.splice(index, 1);
    setInstructions(inst);
  };

  useEffect(() => {
    if (editCourse) {
      setInstructions(course?.instructions);
    }
    register(name, { required: true });
  }, []);

  useEffect(() => {
    setValue(name, instructions);
  }, [instructions]);

  return (
    <div className="flex flex-col gap-2">
      <label>
        <p className="text-richblack-5 text-sm flex gap-[0.1rem]">
          Requirements / Instructions
          <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
        </p>
        <input
          type="text"
          placeholder="Enter Course Instructions"
          name={name}
          value={oneRequirement}
          onChange={(e) => setOneRequirement(e.target.value)}
          autoComplete="on"
          className="bg-richblack-700 text-base p-[0.6rem] resize-none rounded-lg text-richblack-200 shadow-input w-full"
        />
        {errors[name] && (
          <span className="text-richblack-300 opacity-80 text-sm font-bold">
            Please Enter Course Instructions
          </span>
        )}
      </label>
      <div
        className="text-yellow-100 w-fit font-bold text-sm text-left hover:cursor-pointer"
        onClick={addInstructionHandler}
      >
        Add
      </div>
      {instructions.length > 0 && (
        <div className="flex flex-col gap-1 w-full flex-wrap">
          {instructions.map((instruction, index) => {
            return (
              <div
                className="flex items-center text-richblack-5 font-semibold gap-3"
                key={index}
              >
                {instruction}
                <div
                  className="text-richblack-500 text-sm opacity-90 hover:cursor-pointer"
                  onClick={(event) => removeInstructionHandler(event, index)}
                >
                  clear
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseInstructionInput;
