/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, APIAuthenticated } from "../../http";

type LoginDataType = {
  email: string;
  password: string;
};
type UserDataType = {
  user: string;
  email: string;
  phoneNumber: number;
  role: string;
};

type stateType = {
  success: string;
  token: string;
  loginUserData: UserDataType | null;
  loginLoading: boolean;
  loginError: string | null;
};

const initialState: stateType = {
  success: "",
  // token: "",
  token: localStorage.getItem("token") || "",
  loginUserData: null,
  loginLoading: false,
  loginError: null,
};

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

export const getUserProfile = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("auth/getUserProfile", async (_, thunkAPI) => {
  try {
    const response = await APIAuthenticated.get(`/profile`);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      state.loginUserData = null;
      state.loginLoading = false;
      state.loginError = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

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
      })
      // user profile
      .addCase(getUserProfile.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginUserData = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
