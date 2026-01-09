import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Order from "./pages/admin/Order";
import Users from "./pages/admin/Users";
import Reviews from "./pages/admin/Reviews";
import AdminLayout from "./pages/admin/AdminDash";
import store from "./store/store";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { fetchProfile } from "./store/slice/authSlice";
import { fetchOrders } from "./store/slice/orderSlice";
const Layout = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
      dispatch(fetchOrders());
    }
  }, [token, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Order />} />
            <Route path="users" element={<Users />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
