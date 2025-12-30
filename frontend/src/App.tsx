import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./components/products/ProductDetail";
import { Provider } from "react-redux";
import store from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { fetchUserCart } from "./store/cartSlice";
import Checkout from "./pages/checkout/Checkout";
import { fetchProducts } from "./store/productSlice";
import Khaltisuccess from "./pages/checkout/Khaltisuccess";

const Layout = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/signup"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserCart());
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/order/checkout" element={<Checkout />} />
        <Route path="/success" element={<Khaltisuccess />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
