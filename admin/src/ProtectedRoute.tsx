import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./store/hooks";

const ProtectedRoute = () => {
  const { token, loginUserData } = useAppSelector((state) => state.auth);

  // Not admin or not loggedin
  if (loginUserData?.role !== "admin" || !token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
