import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getMe } from "../../../services/operations/profileAPI";
import Spinner from "../../common/Spinner";
import Cookies from "js-cookie";
import { setToken } from "../../../slices/authSlice";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates pending auth check

  useEffect(() => {
    const validateUser = async () => {
      if (!token || token === null || token === undefined) {
        setIsAuthenticated(false); // Redirect if no token
        return;
      }

      const isValid = await dispatch(getMe());
      setIsAuthenticated(isValid);
    };

    validateUser();
  }, [token, dispatch]);

  useEffect(() => {
    if (isAuthenticated === false) {
      Cookies.remove("token");
      localStorage.clear();
      dispatch(setToken(null));
    }
  }, [isAuthenticated, dispatch]);

  if (isAuthenticated === null) {
    return <Spinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
