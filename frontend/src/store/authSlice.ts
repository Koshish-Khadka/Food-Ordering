/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../http";

type RegisterDataType = {
  user: string;
  email: string;
  phoneNumber: string;
  password: string;
};

type LoginDataType = {
  email: string;
  password: string;
};

export const registerUser = createAsyncThunk<
  any, // return type (API response)
  RegisterDataType, // input data type
  { rejectValue: string }
>("auth/registerUsers", async (data, thunkAPI) => {
  try {
    const response = await API.post("auth/register", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

export const loginUser = createAsyncThunk<
  any,
  LoginDataType,
  { rejectValue: string }
>("auth/loginUsers", async (data, thunkAPI) => {
  try {
    const response = await API.post("/auth/login", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null as string | null,
    token: localStorage.getItem("token") || "",
    loginUserData: null,
    loginLoading: false,
    loginError: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.token = "";
      state.loginUserData = null;
      state.loading = false;
      state.loginLoading = false;
      state.error = null;
      state.loginError = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.token = action.payload.token;
        state.loginUserData = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
