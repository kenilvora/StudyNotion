import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import Cookies from "js-cookie";
import { setUser } from "../../slices/profileSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  LOGOUT,
} = authEndpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
      });
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      if (navigate) {
        navigate("/verify-email");
      }
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  contactNumber,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(error.response.data.message);
      navigate("/signup");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      console.log("Token recieve from backend : ", Cookies.get("token"));
      dispatch(setToken(Cookies.get("token")));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message.split(",").at(0));
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function getResetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESETPASSTOKEN RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Password Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function resetPassword(
  password,
  confirmPassword,
  token,
  setResetComplete
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", RESETPASSWORD_API, {
        token,
        password,
        confirmPassword,
      });

      console.log("RESETPASSWORD RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password Reset Successfully");
      setResetComplete(true);
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const res = await apiConnector("GET", LOGOUT);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      localStorage.removeItem("user");
      dispatch(setToken(null));
      dispatch(setUser(null));
      toast.success("Logged Out");
      navigate("/");
    } catch (e) {
      console.log("LOGOUT ERROR............", e);
      toast.error(e.response.data.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
