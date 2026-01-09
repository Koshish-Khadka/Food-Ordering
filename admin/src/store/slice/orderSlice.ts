/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../../http";

export type productType = {
  _id: string;
  productName: string;
  productDescription: string;
  productStockQty: number;
  productPrice: number;
  productStatus: string;
  productImage: string;
};

type stateType = {
  orderData: userOrderType[];
  error: string | null;
  loading: boolean;
  success: boolean;
  message: string | null;
};

export type userOrderType = {
  _id?: string;
  user?: string;
  shippingAddress: string;
  phoneNumber: number;
  items: {
    quantity: number;
    product: productType;
  }[];
  totalAmount: number;
  paymentDetails: {
    method: string;
  };
  orderStatus: string;
  createdAt: string;
};

const initialState: stateType = {
  orderData: [],
  error: null,
  loading: false,
  success: false,
  message: null,
};

export const fetchOrders = createAsyncThunk<
  userOrderType[],
  void,
  { rejectValue: string }
>("checkout/fetchuserOrder", async (_, thunkAPI) => {
  try {
    const response = await APIAuthenticated.get("/admin");
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Order failed"
    );
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // all order
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderData = action.payload;
        state.message = "User order fetched successfully";
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default orderSlice.reducer;
