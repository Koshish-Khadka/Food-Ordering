/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import image from "../../assets/hotdog.png";
import { ShoppingBasket, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollY, setScrollY] = useState(0);
  const isUserLoggedin = true;
  const [onscroll, setOnscroll] = useState(false);
  const items = useSelector((state: any) => state.cart);

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
      className={`fixed top-0 left-0 z-50 w-full
    transition-all duration-300 ease-in-out
    ${onscroll ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={image} alt="logo" className="h-10 w-10 object-cover" />
          <h1
            className={`text-lg ${
              onscroll ? `text-black` : `text-white`
            } font-bold sm:text-xl`}
          >
            BookMandu
          </h1>
        </div>

        {/* Right section */}
        <div>
          {isUserLoggedin ? (
            <div className="flex items-center gap-4">
              <button title="shop" type="button" className="p-2 relative">
                <Link to="/cart">
                  <ShoppingBasket
                    className="h-6 w-6 "
                    color={onscroll ? "black" : "white"}
                  />
                </Link>

                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-600 text-white text-xs">
                    {items.length}
                  </span>
                )}
              </button>
              <button title="user" type="button" className="p-2 ">
                <User
                  className="h-6 w-6"
                  color={onscroll ? "black" : "white"}
                />
              </button>
            </div>
          ) : (
            <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white sm:text-base">
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
