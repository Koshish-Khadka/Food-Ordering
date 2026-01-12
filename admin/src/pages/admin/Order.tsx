/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchOrders, removeOrder } from "../../store/slice/orderSlice";
import { APIAuthenticated } from "../../http";
import { useDispatch } from "react-redux";

const Order = () => {
  const [input, setInput] = useState("");
  const [selectedvalue, setSelectedValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const { orderData, loading } = useAppSelector((state) => state.order);
  const filteredOrders = orderData
    //  Filter by order status (dropdown)
    .filter((order) =>
      selectedvalue ? order.orderStatus === selectedvalue : true
    )

    // Filter items by product name (search)
    .map((order) => ({
      ...order,
      items: order.items.filter((item) =>
        item.product.productName.toLowerCase().includes(input.toLowerCase())
      ),
    }))

    //  Remove orders with no matching items
    .filter((order) => order.items.length > 0);

  const deleteOrder = async (orderId: string) => {
    if (!orderId) return;
    try {
      const response = await APIAuthenticated.delete(`admin/${orderId}`);
      if (response.status === 200) {
        Dispatch(removeOrder(orderId));
        alert("Order deleted");
      }
    } catch (error: any) {
      const message = error.response.data.messsage;
      console.log(message);
      alert(message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-md w-full border mt-14 border-gray-100">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold text-3xl">All Orders</h2>
          <span className="text-xs">All order listed</span>
        </div>
        <div className="flex gap-x-4 items-center justify-between">
          <div className="flex bg-gray-50 items-center p-2 rounded-md border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block "
              type="text"
              name="search"
              id="search"
              onChange={(e) => setInput(e.target.value)}
              placeholder="search..."
            />
          </div>
          <div>
            <label htmlFor="filer">Filter by : </label>
            <select
              title="filter"
              name="filter"
              id="filter"
              className="p-2 rounded-md bg-gray-50 border border-gray-200"
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="pending">pending</option>
              <option value="delivered">delivered</option>
              <option value="cancelled">cancelled</option>
              <option value="ontheway">ontheway</option>
              <option value="preparation">preparation</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    OrderId
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className=" cursor-pointer">
                      {/* Product info */}
                      <td
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        onClick={() => navigate(`/admin/orders/${order._id}`)}
                      >
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-blue-900 underline whitespace-no-wrap">
                              {order._id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {order.totalAmount}
                        </p>
                      </td>

                      {/* Created At */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </td>

                      {/* Payment Method */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {order.paymentDetails.method}
                        </p>
                      </td>

                      {/* Order Status */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                          <span
                            aria-hidden
                            className={`absolute inset-0 opacity-50 rounded-full ${
                              order.orderStatus === "pending"
                                ? "bg-yellow-500"
                                : order.orderStatus === "cancelled"
                                ? "bg-red-500"
                                : order.orderStatus === "delivered"
                                ? "bg-green-500"
                                : "bg-blue-500"
                            }`}
                          ></span>
                          <span className="relative">{order.orderStatus}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          className="border p-2 border-gray-200 bg-red-500 text-white rounded-md transition-all duration-150 ease-in-out hover:scale-105"
                          onClick={() => deleteOrder(order._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
