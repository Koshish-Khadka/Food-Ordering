import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUsers } from "../../store/slice/userSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  const [selectedvalue, setSelectedValue] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { userData, loading } = useAppSelector((state) => state.user);

  const filteredUsers = userData.filter((user) => {
    const matchesRole = selectedvalue ? user.role === selectedvalue : true;

    const matchesSearch = input
      ? user.email.toLowerCase().includes(input.toLowerCase()) ||
        user.user.toLowerCase().includes(input.toLowerCase())
      : true;

    return matchesRole && matchesSearch;
  });

  return (
    <div className="bg-white p-8 rounded-md w-full border mt-14 border-gray-100">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold text-3xl">All Users</h2>
          <span className="text-xs">All users listed</span>
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
              <option value="admin">admin</option>
              <option value="customer">customer</option>
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
                    UserId
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
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
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No result found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="transition-colors duration-150 hover:bg-gray-600 cursor-pointer"
                      // onClick={() => navigate(`/profile/order/${user._id}`)}
                    >
                      {/* Product info */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-blue-900 underline whitespace-no-wrap">
                              {user._id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.user}
                        </p>
                      </td>

                      {/* Created At */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.email}
                        </p>
                      </td>

                      {/* Payment Method */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.phoneNumber}
                        </p>
                      </td>

                      {/* Order Status */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-black leading-tight">
                          <span
                            aria-hidden
                            className={`absolute inset-0 rounded-full ${
                              user.role === "admin"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          ></span>
                          <span className="relative text-white">{user.role}</span>
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
  );
};

export default Users;
