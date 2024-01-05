import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshMutation } from "./authApiSlice";
import { Outlet } from "react-router-dom";
import { setCredentials } from "./authSlice";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.accessToken);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const refreshFunction = async () => {
      const refreshToken = localStorage.getItem("refresh-token");
      try {
        const res = await refresh({ refresh: refreshToken });
        if (res?.data) {
          dispatch(setCredentials(res.data.access));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      refreshFunction();
    } else {
      setIsLoading(false);
    }
  }, []);
  return <>{isLoading ? <div>Loading....</div> : <Outlet />}</>;
};

export default PersistLogin;
