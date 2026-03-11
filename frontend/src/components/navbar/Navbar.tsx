/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import image from "../../assets/hotdog.png";
import { Search, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loginUserData } = useAppSelector((state) => state.auth);
  const [, setScrollY] = useState(0);
  const [onscroll, setOnscroll] = useState(false);
  const [searchButton, setSearchButton] = useState(false);
  const { cartItems } = useAppSelector((state) => state.cart);
  const cartArray = Array.isArray(cartItems) ? cartItems : [];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      if (currentScrollY > 50) {
        setOnscroll(true);
      } else {
        setOnscroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onscroll]);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out
    ${onscroll ? "bg-white shadow-md" : "bg-transparent"}
  `}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <div
            className={`${searchButton ? "hidden sm:flex" : "flex items-center gap-2"}`}
          >
            <img src={image} alt="logo" className="h-10 w-10 object-cover" />
            <h1
              className={`text-lg ${onscroll ? "text-black" : "text-white"} font-bold sm:text-xl`}
            >
              BookMandu
            </h1>
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3 w-full justify-end">
          {/* Search Icon */}
          {!searchButton && (
            <button
              title="search"
              onClick={() => setSearchButton(true)}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white sm:text-base transition-all hover:scale-105 duration-150 ease-in-out"
            >
              <Search className="h-6 w-6" color="white" />
            </button>
          )}

          {/* Search Bar Overlay for Mobile */}
          {searchButton && (
            <div className="absolute top-0 left-0 z-50 w-full bg-white p-4 flex items-center gap-2 sm:hidden">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                className="bg-red-500 px-4 py-2 text-white rounded-xl"
                onClick={() => setSearchButton(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {/* Auth / Profile Buttons */}
          {!searchButton && (
            <>
              {!loginUserData &&
              (!localStorage.getItem("token") ||
                localStorage.getItem("token") === "") ? (
                <div className="flex space-x-4">
                  <Link to="/login">
                    <button className="rounded-xl bg-amber-500 px-4 py-2 text-white font-medium hover:scale-105 transition">
                      Login
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {cartArray.length > 0 && (
                    <Link to="/cart" className="relative">
                      <ShoppingBasket className="h-6 w-6 text-green-600" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-600 text-white text-xs">
                        {cartArray.length}
                      </span>
                    </Link>
                  )}
                  <Link to="/profile">
                    <button className="rounded-xl bg-amber-500 px-4 py-2 text-white font-medium hover:scale-105 transition">
                      Profile
                    </button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
