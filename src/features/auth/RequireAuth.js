import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const RequireAuth = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return <Outlet />;
};

export default RequireAuth;
