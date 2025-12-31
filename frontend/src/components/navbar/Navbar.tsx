/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import image from "../../assets/hotdog.png";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loginUserData } = useAppSelector((state) => state.auth);
  const [, setScrollY] = useState(0);
  const [onscroll, setOnscroll] = useState(false);

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
      className={`fixed top-0 left-0 z-50 w-full
    transition-all duration-300 ease-in-out
    ${onscroll ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to={"/"}>
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
        </Link>

        {/* Right section */}
        <div>
          {!loginUserData &&
          (localStorage.getItem("token") == "" ||
            localStorage.getItem("token") == null ||
            localStorage.getItem("token") == undefined) ? (
            <div className="space-x-4">
              <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white sm:text-base transition-all hover:scale-105 duration-150 ease-in-out">
                <Link to="/login">Login</Link>
              </button>
              <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white sm:text-base transition-all hover:scale-105 duration-150 ease-in-out">
                <Link to="/signup">Register</Link>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {cartArray.length > 0 && (
                <button title="shop" type="button" className="p-2 relative">
                  <Link to="/cart">
                    <ShoppingBasket
                      className="h-6 w-6 "
                      // color={onscroll ? "black" : "white"}
                      color="green"
                    />
                  </Link>
                  <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-600 text-white text-xs">
                    {cartArray.length}
                  </span>
                </button>
              )}
              <Link to={"/profile"}>
                <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white sm:text-base transition-all hover:scale-105 duration-150 ease-in-out">
                  Profile
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
