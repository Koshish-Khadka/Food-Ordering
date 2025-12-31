import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchuserOrder } from "../../store/checkoutSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { orderData } = useAppSelector((state) => state.checkout);
  useEffect(() => {
    dispatch(fetchuserOrder());
  }, []);
  const [input, setInput] = useState("");

  // const searchOrder = orderData.map((order) =>
  //   order.items.filter((product) =>
  //     input.toLowerCase().includes(product.product.productName)
  //   )
  // );

  const filterOrders = orderData
    .map((order) => ({
      ...order,
      items: order.items.filter((items) =>
        items.product.productName.toLowerCase().includes(input.toLowerCase())
      ),
    }))
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

            <button className="border text-sm text-gray-500 border-gray-200 hover:bg-gray-100 transition cursor-pointer px-6 py-1 rounded-full mt-5">
              <p className="mb-1">message</p>
            </button>
          </div>
        </div>
      </div>
      {/* order table */}
      {orderData.length > 0 && (
        <div className="bg-white p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold">Products Oder</h2>
              <span className="text-xs">All products item</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex bg-gray-50 items-center p-2 rounded-md">
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
                        QRT
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterOrders.map((order) =>
                      order.items.map((item) => (
                        <tr key={item.product._id}>
                          {/* Product info */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full object-cover"
                                  src={item.product.productImage}
                                  alt={item.product.productName}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item.product.productName}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Quantity */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.quantity}
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
                                className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">
                                {order.orderStatus}
                              </span>
                            </span>
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
      )}
    </div>
  );
};

export default Profile;
