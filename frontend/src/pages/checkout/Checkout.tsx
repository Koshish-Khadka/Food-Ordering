import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useForm } from "react-hook-form";
import { createOrder, type orderDetailType } from "../../store/checkoutSlice";
import { useNavigate } from "react-router-dom";

type formData = {
  shippingAddress: string;
  phoneNumber: number;
};

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { cartItems } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const cart = Array.isArray(cartItems) ? cartItems : [];
  const dispatch = useAppDispatch();
  const totalAmount = cart.reduce(
    (prev, item) => prev + item.product.productPrice * item.quantity,
    0
  );

  const totalQuantity = cart.reduce((prev, item) => prev + item.quantity, 0);

  const { data, success, error, loading } = useAppSelector(
    (state) => state.checkout
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const onSubmit = (data: formData) => {
    if (cart.length === 0) return;
    const orderDetails: orderDetailType = {
      shippingAddress: data.shippingAddress,
      phoneNumber: data.phoneNumber,
      items: cart.map((item) => ({
        quantity: item.quantity,
        product: item.product._id,
      })),
      totalAmount: totalAmount,
      paymentDetails: {
        method: paymentMethod,
      },
    };
    dispatch(createOrder(orderDetails));
  };

  useEffect(() => {
    if (paymentMethod === "COD" && success) {
      alert(" Order placed successfully");
      navigate("/");
      return;
    }
    if (paymentMethod === "Khalti" && success) {
      navigate("/khalti");
      return;
    }
    if (error) {
      alert(` ${error}`);
    }
  }, [data, success, error]);

  return (
    <>
      <div className="pt-20 flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <div className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  title="apd"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </div>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          {cart.map((items) => (
            <div
              className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"
              key={items.product._id}
            >
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={items.product.productImage}
                  alt={items.product.productName}
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    {items.product.productName}
                  </span>

                  <p className="text-sm">Quantity :{items.quantity}</p>
                  <p className="text-lg font-bold">
                    ${items.product.productPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                  {...register("shippingAddress", {
                    required: "shippingAddress is required",
                  })}
                />
                {errors.shippingAddress && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.shippingAddress.message}
                  </p>
                )}

                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7XgY7la-lL8IjA0mHpN7P7BuUkE8_8o5YBw&s"
                    alt="flag"
                  />
                </div>
              </div>
            </div>

            <label
              htmlFor="phoneNumber"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Phone Number
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative shrink-0 sm:w-7/12">
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Phone Number"
                  {...register("phoneNumber", {
                    required: "phoneNumber is required",
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}

                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Phone_icon.png"
                    alt="phone"
                  />
                </div>
              </div>
            </div>

            <p className="mt-8 text-lg font-medium">Payment Methods</p>
            <div className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  value={"COD"}
                  checked={paymentMethod === "COD"}
                  onChange={handlePaymentChange}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://img.freepik.com/premium-vector/cash-delivery-concept-vector-illustration_620585-2106.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="cod"
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Cash on Delivery</span>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  name="radio"
                  value={"Khalti"}
                  checked={paymentMethod === "Khalti"}
                  onChange={handlePaymentChange}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_2"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://dao578ztqooau.cloudfront.net/static/img/logo1.png"
                    alt="khalti"
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Khalti</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Total Quantity
                </p>
                <p className="font-semibold text-gray-900">{totalQuantity}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">Free</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${totalAmount}
              </p>
            </div>
            <button
              className="mt-4 mb-8 w-full rounded-md bg-amber-500 transition-all hover:scale-105 duration-300 hover:bg-amber-600 px-6 py-3 font-medium text-white"
              type="submit"
            >
              {loading ? <p>Please wait .... </p> : <p>Place Order</p>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
