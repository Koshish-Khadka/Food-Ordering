/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteCartItem, updateCartItems } from "../../store/cartSlice";

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const isCartArray = Array.isArray(cartItems) ? cartItems : [];

  // console.log("Cart items", isCartArray);

  const totalItems = isCartArray.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  const totalAmount = isCartArray.reduce(
    (acc, item) =>
      acc + (item.quantity || 0) * (item.product.productPrice || 0),
    0
  );

  const dispatch = useAppDispatch();

  const handleQuantityChange = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    await dispatch(updateCartItems({ productId, quantity }));
  };

  const handleItemDelete = async (productId: string) => {
    await dispatch(deleteCartItem(productId));
  };

  return (
    <div className=" flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">
            {isCartArray.length} Items
          </span>
        </h1>
        {isCartArray.length === 0 ? (
          <p className="text-center text-xl font-bold text-red-700 my-12">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-[2fr_2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
            <p className="text-left">Product Details</p>
            <p className="text-center">Quantity</p>
            <p className="text-center">price</p>
            <p className="text-center">Action</p>
          </div>
        )}

        {isCartArray.map((item, index) => (
          <div
            key={item.product._id + "-" + index}
            className="grid grid-cols-[2fr_2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <img
                  className="max-w-full h-full object-cover"
                  src={item.product.productImage}
                  alt={item.product.productName}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">
                  {item.product.productName}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <button
                className="border px-2 rounded-l-md transition-all hover:scale-110 duration-200 ease-in"
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity - 1)
                }
              >
                -
              </button>
              <p className="text-center">{item.quantity}</p>
              <button
                className="border px-2 rounded-r-md transition-all hover:scale-110 duration-200 ease-in"
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity + 1)
                }
              >
                +
              </button>
            </div>
            <p className="text-center">
              {(item.quantity || 0) * (item.product.productPrice || 0)}
            </p>

            <button
              title="btn"
              className="cursor-pointer mx-auto transition-all hover:scale-125 duration-150 ease-in"
              onClick={() => handleItemDelete(item.product._id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

        <Link to={"/"}>
          <button className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium hover:border p-2 rounded-md">
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                stroke="#615fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Continue Shopping
          </button>
        </Link>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Total items</span>
            <span>{totalItems}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${totalAmount}</span>
          </p>
        </div>
        <Link to={"/order/checkout"}>
          <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
            Place Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
