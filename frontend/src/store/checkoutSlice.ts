/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIAuthenticated } from "./../http/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type orderType = {
  user: string;
  items: {
    quantity: number;
    product: string;
  };
  totalAmount: number;
  shippingAddress: string;
  orderStatus: string;
  paymentDetails: {
    method: string;
  };
};

type stateType = {
  data: orderType[];
  error: string | null;
  loading: boolean;
  success: boolean;
  message: string | null;
};

export type orderDetailType = {
  shippingAddress: string;
  phoneNumber: number;
  items: {
    quantity: number;
    product: string;
  }[];
  totalAmount: number;
  paymentDetails: {
    method: string;
  };
};

const initialState: stateType = {
  data: [],
  error: null,
  loading: false,
  success: false,
  message: null,
};

export const createOrder = createAsyncThunk<
  orderType[],
  orderDetailType,
  { rejectValue: string }
>("checkoutSlice/createOrder", async (orderDetails, thunkAPI) => {
  try {
    const response = await APIAuthenticated.post("order", orderDetails);

    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Order failed"
    );
  }
});
export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
        state.message = "Order placed successfully";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default checkoutSlice.reducer;
