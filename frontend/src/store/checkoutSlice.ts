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
};

export const createOrder = createAsyncThunk<orderType[], orderDetailType>(
  "checkoutSlice/createOrder",
  async (orderDetails, thunkAPI) => {
    try {
      const response = await APIAuthenticated.post("order", orderDetails);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});
