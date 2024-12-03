import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { HiPencil } from "react-icons/hi";
import { BiSolidTrash } from "react-icons/bi";
import Spinner from "../../../../common/Spinner";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
import SubSectionModal from "./SubSectionModal";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteSectionBtnHandler = async (sectionId, courseId) => {
    try {
      setLoading(true);
      setConfirmationModal(null);
      const data = {
        sectionId,
        courseId,
      };

      const result = await deleteSection(data);
      if (result) {
        dispatch(setCourse(result));
      }
    } catch (error) {
      console.log("Error in deleteSectionBtnHandler -> ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubSectionBtnHandler = async (
    sectionId,
    subSectionId,
    courseId
  ) => {
    try {
      setLoading(true);
      setConfirmationModal(null);
      const data = {
        sectionId,
        subSectionId,
        courseId,
      };

      const result = await deleteSubSection(data);
      if (result) {
        dispatch(setCourse(result));
      }
    } catch (error) {
      console.log("Error in deleteSubSectionBtnHandler -> ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="bg-richblack-700 rounded-lg p-5 py-3 text-richblack-5 border border-richblack-600">
          <div className="divide-y flex flex-col divide-richblack-500">
            {course?.courseContent.map((section, index) => {
              return (
                <details
                  key={index}
                  className="pt-2.5 divide-y divide-richblack-500"
                  open
                >
                  <summary className="flex items-center justify-between w-full text-lg font-bold pb-2.5 hover:cursor-pointer">
                    <div className="flex gap-3 items-center">
                      <RxDropdownMenu className="text-richblack-50 font-extrabold text-2xl"></RxDropdownMenu>
                      <p>{section.sectionName}</p>
                    </div>
                    <div className="flex gap-1 text-xl text-richblack-200 items-center">
                      <div className="flex gap-3 items-center pr-2 border-r-2 border-richblack-300">
                        <button
                          onClick={() =>
                            handleChangeEditSectionName(
                              section._id,
                              section.sectionName
                            )
                          }
                        >
                          <HiPencil></HiPencil>
                        </button>
                        <button
                          onClick={() => {
                            setConfirmationModal({
                              text1: "Delete This Section?",
                              text2:
                                "All Lectures inside this section will be deleted.",
                              btn1: "Delete Section",
                              btn2: "Cancel",
                              btn1Handler: () => {
                                deleteSectionBtnHandler(
                                  section._id,
                                  course._id
                                );
                              },
                              btn2Handler: () => {
                                setConfirmationModal(null);
                              },
                            });
                          }}
                        >
                          <BiSolidTrash></BiSolidTrash>
                        </button>
                      </div>
                      <IoMdArrowDropdown className="text-3xl"></IoMdArrowDropdown>
                    </div>
                  </summary>
                  <div className="flex justify-end">
                    <div className="w-[95%] flex flex-col divide-y divide-richblack-500">
                      {section?.subSection.map((subSection, index) => {
                        return (
                          <div
                            key={index}
                            className="flex py-2.5 items-center justify-between w-full text-lg font-bold hover:cursor-pointer"
                            onClick={(event) => {
                              event.stopPropagation();
                              setViewSubSection(subSection);
                            }}
                          >
                            <div className="flex gap-3 items-center">
                              <MdOndemandVideo className="text-richblack-50 font-extrabold text-xl"></MdOndemandVideo>
                              <p>{subSection.title}</p>
                            </div>

                            <div className="flex gap-3 text-xl text-richblack-200 items-center">
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setEditSubSection(subSection);
                                }}
                              >
                                <HiPencil></HiPencil>
                              </button>
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setConfirmationModal({
                                    text1: "Delete This Sub-Section?",
                                    text2: "Selected Lecture will be deleted.",
                                    btn1: "Delete Lecture",
                                    btn2: "Cancel",
                                    btn1Handler: () => {
                                      deleteSubSectionBtnHandler(
                                        section._id,
                                        subSection._id,
                                        course._id
                                      );
                                    },
                                    btn2Handler: () => {
                                      setConfirmationModal(null);
                                    },
                                  });
                                }}
                              >
                                <BiSolidTrash></BiSolidTrash>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <div>
                        <button
                          className="text-yellow-100 w-fit py-2.5 font-bold flex items-center gap-1"
                          onClick={() => setAddSubSection(section._id)}
                        >
                          <FaPlus className=""></FaPlus> Add Lecture
                        </button>
                      </div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      )}

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        ""
      )}

      {confirmationModal && (
        <ConfirmationModal data={confirmationModal}></ConfirmationModal>
      )}
    </>
  );
};

export default NestedView;
