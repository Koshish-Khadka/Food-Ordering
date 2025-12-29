import React, { useEffect, useState } from "react";
import { registerUser } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    user: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(input));
  };

  useEffect(() => {
    if (!error) {
      alert("User registered successfully");
      navigate("/login");
    } else {
      alert("Failed to register user");
    }
  }, [error, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-300 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm mb-1 block">
              UserName
            </label>
            <input
              id="name"
              type="text"
              onChange={handleChange}
              name="user"
              placeholder="Username"
              className="w-full border px-3 py-2 rounded-md
                         focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm mb-1 block">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="abcd@gmail.com"
              className="w-full border px-3 py-2 rounded-md
                         focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="number" className="text-sm mb-1 block">
              Phone Number
            </label>
            <input
              id="number"
              type="number"
              onChange={handleChange}
              name="phoneNumber"
              placeholder="9888888888"
              className="w-full border px-3 py-2 rounded-md
                         focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm mb-1 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Password"
              className="w-full border px-3 py-2 rounded-md
                         focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading} // prevent multiple clicks
            className="w-full py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Signup"} {/* loader text */}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          {/* Success message */}
          {!error && (
            <p className="text-green-500 text-sm mt-2 text-center">
              Registration successful!
            </p>
          )}
        </form>

        <div className="mt-4 text-center text-sm text-gray-600 space-y-2">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login In
            </a>
          </p>
          <a href="/forgot-password" className="text-blue-500">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
