import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = () => {
  const { loginUserData, token } = useAppSelector((state) => state.auth);

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (loginUserData?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Allowed → render child route
  return <Outlet />;
};

export default ProtectedRoute;
