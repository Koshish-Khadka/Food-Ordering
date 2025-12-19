/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export type productType = {
  _id: string;
  productName: string;
  productDescription: string;
  productStockQty: number;
  productPrice: number;
  productStatus: string;
  productImage: string;
};

type ProductState = {
  data: productType[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  productType[], // return type
  void, // argument type
  { rejectValue: string }
>("product/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/products/getAllProducts"
    );
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch products");
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setProducts(state, action) {
    //   state.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<productType[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});
// export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
