const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-300 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="text-sm mb-1 block">
              Email Address
            </label>
            <input
              id="email"
              type="email"
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
            Login
          </button>
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
