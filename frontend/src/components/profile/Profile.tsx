import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchuserOrder } from "../../store/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { orderData } = useAppSelector((state) => state.checkout);
  const [selectedvalue, setSelectedValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchuserOrder());
  }, [dispatch]);

  const [input, setInput] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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

  return (
    <div className="pt-20 max-w-6xl m-auto">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <div className="bg-white rounded-2xl pb-4 overflow-hidden border border-gray-200 hover:-translate-y-1 transition duration-300">
          <div className="w-64 flex justify-center pt-10">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <img
                className="h-32 object-cover object-top"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="userImage2"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-medium mt-3">Kelvin John</p>
            <p className="text-gray-500 text-sm">kelvin.john@gmail.com</p>
            <p className="text-gray-500 text-sm">9843023686</p>

            <button
              className="mt-4 rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white sm:text-base transition-all hover:scale-105 duration-150 ease-in-out"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* order table */}
      {orderData.length > 0 && (
        <div className="bg-white p-8 rounded-md w-full border mt-4 border-gray-100">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold">Orders</h2>
              <span className="text-xs">All order history</span>
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
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        products
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created at
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="transition-colors duration-150 hover:bg-gray-600 cursor-pointer"
                        onClick={() => navigate(`/profile/order/${order._id}`)}
                      >
                        {/* Product info */}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
                            <span className="relative">
                              {order.orderStatus}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
