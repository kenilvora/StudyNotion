import { useDispatch, useSelector } from "react-redux";
import RenderSteps from "./RenderSteps";
import { AiFillThunderbolt } from "react-icons/ai";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resetCourseState } from "../../../../slices/courseSlice";

export default function AddCourse() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCourseState());
  }, []);

  return (
    <div className="flex flex-col gap-12 text-richblack-5 justify-center">
      <div className="text-3xl font-bold flex justify-between w-full">
        Add Course
      </div>

      <div className="flex justify-between max-[980px]:flex-col-reverse max-[980px]:gap-5">
        <RenderSteps></RenderSteps>

        <div className="flex min-[981px]:sticky top-8 flex-col min-[981px]:w-[38%] px-4 py-5 pr-6 bg-richblack-800 text-richblack-5 rounded-lg border border-richblack-600 gap-4 h-fit">
          <div className="text-xl font-bold flex items-center">
            <AiFillThunderbolt className=" text-yellow-100"></AiFillThunderbolt>
            Course Upload Tips
          </div>

          <ul className="list-disc space-y-3 text-[0.8rem] font-semibold pb-1 text-richblack-25 pl-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
