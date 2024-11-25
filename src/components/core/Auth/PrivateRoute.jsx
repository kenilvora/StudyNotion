import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getMe } from "../../../services/operations/profileAPI";
import Spinner from "../../common/Spinner";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates pending auth check

  useEffect(() => {
    const validateUser = async () => {
      if (!token || token === "null") {
        setIsAuthenticated(false); // Redirect if no token
        return;
      }

      const isValid = dispatch(getMe());
      setIsAuthenticated(isValid);
    };

    validateUser();
  }, [token, dispatch]);

  if (isAuthenticated === null) {
    return <Spinner />;
  }

  console.log("User is authenticated: ", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
