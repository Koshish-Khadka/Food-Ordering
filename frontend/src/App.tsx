import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./components/Home";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./components/products/ProductDetail";
import { Provider } from "react-redux";
import store from "./store/store";

const Layout = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/signup"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
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
