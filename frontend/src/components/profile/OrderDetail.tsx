/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { fetchuserOrder } from "../../store/checkoutSlice";
import { APIAuthenticated } from "../../http";
import UpdateOrder from "./UpdateOrder";

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const { orderData, loading } = useAppSelector((state) => state.checkout);
  const [ismodelopen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!orderData.length) {
      dispatch(fetchuserOrder());
    }
  }, [dispatch, orderData.length]);

  //   const [data] = orderData.filter((item) => item._id === orderId);
  const data = orderData.find((item) => item._id === orderId);
  const navigate = useNavigate();

  if (loading || !data) {
    return <p className="text-center mt-20">Loading order...</p>;
  }

  const cancelOrder = async (orderId?: string) => {
    if (!orderId) return;
    try {
      const response = await APIAuthenticated.patch(`/order/cancel/${orderId}`);
      alert(response.data.message);
      dispatch(fetchuserOrder());
      navigate("/profile");
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const deleteOrder = async (orderId?: string) => {
    try {
      const response = await APIAuthenticated.delete(`order/${orderId}`);
      alert(response.data.message);
      dispatch(fetchuserOrder());
      navigate("/profile");
    } catch (error: any) {
      if (error.response) {
        alert(error.response.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  // const updateOrder = async (orderId?: string) => {
  //   try {
  //     const response = await APIAuthenticated.patch(`/order/${orderId}`);
  //   } catch (error: any) {
  //     if (error.response.message) {
  //       alert(error.response.message);
  //     } else {
  //       alert("Something went wrong");
  //     }
  //   }
  // };

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Order #{orderId}
        </h1>
        <p className="text-base font-medium leading-6 text-gray-600">
          21st Mart 2021 at 10:34 PM
        </p>
      </div>

      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Cart
            </p>

            <div className="mt-4 md:mt-6 flex flex-col space-y-6 w-full">
              {data.items.map((item) => (
                <div key={item.product._id} className="flex flex-col w-full">
                  <div className="pb-4 w-full md:w-40">
                    <img
                      className="w-full hidden md:block"
                      src={item.product.productImage}
                      alt={item.product.productName}
                    />
                    <img
                      className="w-full md:hidden"
                      src={item.product.productImage}
                      alt={item.product.productName}
                    />
                  </div>

                  <div className="border-b border-gray-200 flex flex-col md:flex-row justify-between items-start w-full pb-6 space-y-4 md:space-y-0">
                    <h3 className="text-xl xl:text-2xl font-semibold text-gray-800">
                      {item.product.productName}
                    </h3>

                    <p className="text-base xl:text-lg font-semibold text-gray-800">
                      ${item.product.productPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>

              <div className="flex flex-col w-full space-y-4 border-b border-gray-200 pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base text-gray-800">Subtotal</p>
                  <p className="text-base text-gray-600">${data.totalAmount}</p>
                </div>

                <div className="flex justify-between w-full">
                  <p className="text-base text-gray-800">
                    Discount{" "}
                    <span className="bg-gray-200 p-1 text-xs font-medium">
                      STUDENT
                    </span>
                  </p>
                  <p className="text-base text-gray-600">-$0 (0%)</p>
                </div>

                <div className="flex justify-between w-full">
                  <p className="text-base text-gray-800">Shipping</p>
                  <p className="text-base text-gray-600">$0</p>
                </div>
              </div>

              <div className="flex justify-between w-full">
                <p className="text-base font-semibold text-gray-800">Total</p>
                <p className="text-base font-semibold text-gray-600">
                  ${data.totalAmount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gray-50 w-full xl:w-96 px-4 py-6 md:p-6 xl:p-8">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Customer
          </h3>

          <div className="flex flex-col space-y-6">
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {data.shippingAddress}
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {data.phoneNumber}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Payment Method
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {data.paymentDetails.method}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Order Status
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {data.orderStatus}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 w-full">
                {/* Cancel Order */}
                <button
                  onClick={() => cancelOrder(data._id)}
                  disabled={data.orderStatus === "cancelled"}
                  className={`w-full py-3 rounded-md border text-sm font-semibold transition-all
      ${
        data.orderStatus === "cancelled"
          ? "cursor-not-allowed bg-gray-200 text-gray-500 border-gray-300"
          : "border-red-500 text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-500"
      }`}
                >
                  Cancel Order
                </button>

                {/* Delete Order */}
                <button
                  className="w-full py-3 rounded-md bg-red-600 text-white text-sm font-semibold
               hover:bg-red-700 transition-all
               focus:ring-2 focus:ring-red-500"
                  onClick={() => deleteOrder(data._id)}
                >
                  Delete Order
                </button>

                {/* Edit Order */}
                <button
                  className="w-full py-3 rounded-md bg-blue-600 text-white text-sm font-semibold
               hover:bg-blue-700 transition-all
               focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsModalOpen(true)}
                >
                  Edit Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ismodelopen && <UpdateOrder onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default OrderDetail;
