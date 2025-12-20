/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
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

const STATUSES = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: STATUSES.SUCCESS,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;

export default authSlice.reducer;

export function registerUser(data: RegisterDataType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async function registerUserThunk(dispatch: any) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios.post("http://localhost:3000/api/auth/apple/register", data);
      // console.log("user register", response.data);
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function LoginUser(data: LoginDataType) {
  return async function loginUserThunk(dispatch: any) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login/adhcuaghcw",
        data
      );
      console.log("user login", response.data);
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
