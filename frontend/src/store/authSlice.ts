/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      data
    );
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
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      data
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    loading: false,
    error: null as string | null,
    loginData: null,
    loginLoading: false,
    loginError: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
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
        state.loginData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload || "Something went wrong";
      });
  },
});

export default authSlice.reducer;
