import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getMe } from "../../../services/operations/profileAPI";
import Spinner from "../../common/Spinner";

function OpenRoute({ children }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates pending check

  useEffect(() => {
    const validateUser = async () => {
      if (!token || token === "null") {
        setIsAuthenticated(false); // No token, allow access
        return;
      }

      const isValid = dispatch(getMe());
      setIsAuthenticated(isValid);
    };

    validateUser();
  }, [dispatch, token]);

  if (isAuthenticated === null) {
    // Optionally render a loading spinner or skeleton
    return <Spinner />;
  }

  if (isAuthenticated === false) {
    Cookies.remove("token");
    return children;
  }

  return <Navigate to="/dashboard/my-profile" />;
}

export default OpenRoute;
