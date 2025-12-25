/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { API } from "../http";

export type productType = {
  _id: string;
  productName: string;
  productDescription: string;
  productStockQty: number;
  productPrice: number;
  productStatus: string;
  productImage: string;
};

export type ReviewType = {
  _id: string;
  rating: number;
  message: string;
  userId: {
    _id: string;
    user: string;
  };
};

type ProductState = {
  data: productType[];
  selectedProduct: productType | null;
  reviews: ReviewType[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  data: [],
  selectedProduct: null,
  reviews: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  productType[], // return type
  void, // argument type
  { rejectValue: string }
>("product/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await API.get("products/getAllProducts");
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch products");
  }
});

export const fetchSingleProduct = createAsyncThunk<
  { product: productType; reviews: ReviewType[] },
  string,
  { rejectValue: string }
>("product/fetchSingleProduct", async (productId, thunkAPI) => {
  try {
    const response = await API.get(`products/${productId}`);

    return {
      product: response.data.data.product,
      reviews: response.data.data.productReviews,
    };
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch product");
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
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
      })
      // fetchSingleProduct
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.product;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error";
      });
  },
});
// export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
