import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { getUserProfile } from "./store/slice/authSlice";

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const { token, loginUserData } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !loginUserData) {
      dispatch(getUserProfile());
    }
  }, [token, loginUserData, dispatch]);

  // Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Waiting for profile
  if (!loginUserData) {
    return <p className="p-6">Loading...</p>;
  }

  // Not admin
  if (loginUserData.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
