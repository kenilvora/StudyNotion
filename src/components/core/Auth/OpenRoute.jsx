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
      if (!token || token === null || token === undefined) {
        setIsAuthenticated(false);
        return;
      }

      const isValid = await dispatch(getMe());
      setIsAuthenticated(isValid);
    };

    validateUser();
  }, [dispatch, token]);

  if (isAuthenticated === null) {
    return <Spinner />;
  }

  return isAuthenticated ? <Navigate to="/dashboard/my-profile" /> : children;
}

export default OpenRoute;
