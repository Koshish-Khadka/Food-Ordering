import { useEffect, useState } from "react";
import image from "../../assets/hotdog.png";
import { ShoppingBasket, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const isUserLoggedin = false;
  const [onscroll, setOnscroll] = useState(false);
  console.log(onscroll, scrollY);

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
              <button
                title="shop"
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ShoppingBasket
                  className="h-6 w-6"
                  color={onscroll ? "black" : "white"}
                />
              </button>
              <button
                title="user"
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
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
