import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //! check if the user is logged in
  const { userAuth } = useSelector((state) => state?.users);
  const isLoggedin = userAuth?.userInfo?.token;
  if (!isLoggedin) {

    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
