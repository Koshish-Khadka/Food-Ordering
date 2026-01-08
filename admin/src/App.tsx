import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Order from "./pages/admin/Order";
import Users from "./pages/admin/Users";
import Reviews from "./pages/admin/Reviews";
import AdminLayout from "./pages/admin/AdminDash";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
