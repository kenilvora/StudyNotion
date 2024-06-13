import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseEntireData: null,
  courseSectionData: [],
  totalNoOfLectures: 0,
  completedLectures: [],
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload;
    },
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
  },
});

export const {
  setEntireCourseData,
  setCourseSectionData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
