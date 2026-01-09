import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../store/slice/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
type formData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();
  const { loginError, loginLoading, loginUserData } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = (data: formData) => {
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (loginUserData && loginUserData.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [loginUserData, navigate]);

  return (
    <main className="mt-20 flex items-center justify-center w-full px-4">
      <form
        className="flex w-full flex-col max-w-96"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <a
          href="https://prebuiltui.com"
          className="mb-8"
          title="Go to PrebuiltUI"
        >
          <svg
            className="size-10"
            width="30"
            height="33"
            viewBox="0 0 30 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m8 4.55 6.75 3.884 6.75-3.885M8 27.83v-7.755L1.25 16.19m27 0-6.75 3.885v7.754M1.655 8.658l13.095 7.546 13.095-7.546M14.75 31.25V16.189m13.5 5.976V10.212a2.98 2.98 0 0 0-1.5-2.585L16.25 1.65a3.01 3.01 0 0 0-3 0L2.75 7.627a3 3 0 0 0-1.5 2.585v11.953a2.98 2.98 0 0 0 1.5 2.585l10.5 5.977a3.01 3.01 0 0 0 3 0l10.5-5.977a3 3 0 0 0 1.5-2.585"
              stroke="#1d293d"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <h2 className="text-4xl font-medium text-gray-900">Sign in</h2>

        <p className="mt-4 text-base text-gray-500/90">
          Please enter email and password to access.
        </p>

        <div className="mt-10">
          <label className="font-medium">Email</label>
          <input
            placeholder="Please enter your email"
            className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
            required
            type="email"
            {...register("email", {
              required: "email is required",
            })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="font-medium">Password</label>
          <input
            placeholder="Please enter your password"
            className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
            required
            type="password"
            {...register("password", {
              required: "password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
          disabled={loginLoading}
        >
          Login
        </button>
        {loginError && (
          <p className="mt-4 text-red-600 text-sm text-center">{loginError}</p>
        )}
      </form>
    </main>
  );
}
