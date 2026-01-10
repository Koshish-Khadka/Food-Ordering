import { NavLink, Outlet } from "react-router-dom";
import {
  CalendarArrowUp,
  LayoutDashboard,
  ShoppingCart,
  Users,
  UserStar,
} from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slice/authSlice";

const AdminLayout = () => {
  const dispatch = useAppDispatch();

  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
    {
      name: "Orders",
      path: "orders",
      icon: <CalendarArrowUp className="w-6 h-6" />,
    },
    {
      name: "Users",
      path: "users",
      icon: <Users className="w-6 h-6" />,
    },
    {
      name: "products",
      path: "products",
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      name: "Reviews",
      path: "reviews",
      icon: <UserStar className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <p className="font-semibold">Admin Panel</p>
        <button
          className="border rounded-full text-sm px-4 py-1"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="md:w-64 w-16 border-r border-gray-300 pt-4">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === ""}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 transition
                 ${
                   isActive
                     ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                     : "text-gray-700 hover:bg-gray-100"
                 }`
              }
            >
              {item.icon}
              <span className="md:block hidden">{item.name}</span>
            </NavLink>
          ))}
        </aside>

        {/* Right Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
