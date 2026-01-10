/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../../http";

type productData = {
  _id: string;
  productName: string;
  productDescription: string;
  productStockQty: number;
  productPrice: number;
  productStatus: string;
  productImage: string | null;
  createdAt: string;
};

type AsyncState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

type ProductState = {
  products: productData[];
  fetchProducts: AsyncState;
  addProduct: AsyncState;
};

const initialAsyncState: AsyncState = {
  loading: false,
  error: null,
  success: false,
};
const initialState: ProductState = {
  products: [],
  fetchProducts: { ...initialAsyncState },
  addProduct: { ...initialAsyncState },
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

export const addProduct = createAsyncThunk<
  productData,
  FormData,
  { rejectValue: string }
>("order/createOrder", async (formData, thunkAPI) => {
  try {
    const response = await APIAuthenticated.post(
      `/products/createProduct`,
      formData
    );
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Create Order failed"
    );
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetAddProductState: (state) => {
      state.addProduct = { ...initialAsyncState };
    },
  },
  extraReducers: (builder) => {
    builder
      //  FETCH PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.fetchProducts.loading = true;
        state.fetchProducts.error = null;
        state.fetchProducts.success = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetchProducts.loading = false;
        state.fetchProducts.success = true;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.fetchProducts.loading = false;
        state.fetchProducts.success = false;
        state.fetchProducts.error = action.payload || "Something went wrong";
      })

      // ADD PRODUCT
      .addCase(addProduct.pending, (state) => {
        state.addProduct.loading = true;
        state.addProduct.error = null;
        state.addProduct.success = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.success = true;
        state.products.unshift(action.payload); // add newly created product
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.success = false;
        state.addProduct.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetAddProductState } = productSlice.actions;
export default productSlice.reducer;
