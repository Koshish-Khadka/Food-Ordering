/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../../http";

type productData = {
  productName: string;
  productDescription: string;
  productStockQty: number;
  productPrice: number;
  productStatus: string;
  productImage: string;
  createdAt: string;
};

type state = {
  productData: productData[];
  error: string | null;
  loading: boolean;
  success: boolean;
};

export const fetchProducts = createAsyncThunk<
  productData[],
  void,
  { rejectValue: string }
>("product/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await APIAuthenticated.get("/products/getAllProducts");
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Order failed"
    );
  }
});
const initialState: state = {
  productData: [],
  error: null,
  loading: false,
  success: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.productData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
