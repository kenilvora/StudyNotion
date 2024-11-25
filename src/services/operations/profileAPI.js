import { profileEndpoints, settingsEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setLoading } from "../../slices/profileSlice";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

const { GET_INSTRUCTOR_DASHBOARD_DATA_API, GET_USER_ENROLLED_COURSES_API, ME } =
  profileEndpoints;

export function updateDisplayPicture(displayPicture) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        displayPicture,
        {
          "Content-Type": "multipart/form-data",
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));

      toast.success("Profile Picture Updated Successfully");
    } catch (error) {
      console.log("UPDATE DISPLAY PICTURE ERROR............", error);
      toast.error("Could Not Update Display Picture");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function updateProfile(dateOfBirth, gender, contactNumber, about) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, {
        dateOfBirth: dateOfBirth ? dateOfBirth : "",
        gender: gender ? gender : "",
        contactNumber,
        about,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.userDetails));
      localStorage.setItem("user", JSON.stringify(response.data.userDetails));

      toast.success("Profile Details Updated Successfully");
    } catch (error) {
      console.log("UPDATE PROFILE ERROR............", error);
      toast.error("Could Not Update Profile Details");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function changePassword(oldPassword, newPassword, confirmNewPassword) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("PUT", CHANGE_PASSWORD_API, {
        oldPassword,
        newPassword,
        confirmNewPassword,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Updated Successfully");
    } catch (error) {
      console.log("UPDATE PASSWORD ERROR............", error);
      toast.error("Could Not Update Password");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function deleteAccount(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(logout(navigate));
      if (localStorage.length > 0) {
        localStorage.clear();
      }
      toast.success("Account Deleted Successfully");
    } catch (error) {
      console.log("ACCOUNT DELETE ERROR............", error);
      toast.error("Could Not Delete Account");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export async function getUserEnrolledCourses() {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}

export async function getInstructorData() {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const res = await apiConnector("GET", GET_INSTRUCTOR_DASHBOARD_DATA_API);

    if (!res?.data?.success) {
      throw new Error(res?.data?.message);
    }

    result = res?.data?.data;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API ERROR...", error);
    toast.error("Could not get Instructor data");
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}

export function getMe() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("GET", ME);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return true;
    } catch (error) {
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };
}
