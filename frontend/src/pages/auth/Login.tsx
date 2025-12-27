import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const dispatch = useAppDispatch();
  const { token, loginError, loginLoading } = useAppSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(input));

  };

  useEffect(() => {
    if (token && !loginError) {
      navigate("/");
    }
  }, [token, navigate, loginError]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-300 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
            className="w-full py-2 bg-amber-500 text-white rounded-lg
                       hover:bg-amber-600 transition-colors duration-300"
          >
            {loginLoading ? "Logging In..." : "Login"}
          </button>
          {loginError && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {loginError}
            </p>
          )}
          {token && !loginError && (
            <p className="text-green-500 text-sm mt-2 text-center">
              Logged In successfully!
            </p>
          )}
        </form>

        <div className="mt-4 text-center text-sm text-gray-600 space-y-2">
          <p>
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign Up
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
export default Login;
