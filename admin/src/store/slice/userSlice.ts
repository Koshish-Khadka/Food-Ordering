/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../../http";

export type userData = {
  _id: string;
  user: string;
  email: string;
  phoneNumber: number;
  role: string;
};
export type stateType = {
  userData: userData[];
  error: string | null;
  loading: boolean;
  success: boolean;
};

const initialState: stateType = {
  userData: [],
  error: null,
  loading: false,
  success: false,
};

export const fetchUsers = createAsyncThunk<userData[], void, { rejectValue: string }>(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await APIAuthenticated.get("/admin/users");
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Order failed"
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userData = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default userSlice.reducer;
