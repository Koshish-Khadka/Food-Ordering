/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { APIAuthenticated } from "../http";

type cartItemsType = {
  quantity: number;
  product: {
    _id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productImage: string;
  };
};

type initialStateType = {
  cartItems: cartItemsType[];
  error: string | null;
  loading: boolean;
};

type updateCartItemsPropsType = {
  productId: string;
  quantity: number;
};

export const addToCart = createAsyncThunk<cartItemsType[], string>(
  "cart/addToCart",
  async (productId, thunkAPI) => {
    try {
      const response = await APIAuthenticated.post(`/cart/${productId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchUserCart = createAsyncThunk<cartItemsType[], void>(
  "cart/fetchUserCart",
  async (_, thunkAPI) => {
    try {
      const response = await APIAuthenticated.get("/cart/getCartItems");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCartItems = createAsyncThunk<
  { productId: string; quantity: number },
  updateCartItemsPropsType
>("cart/updateCartItems", async ({ productId, quantity }, thunkAPI) => {
  try {
    await APIAuthenticated.patch(`/cart/${productId}`, { quantity });
    return { productId, quantity };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteCartItem = createAsyncThunk<{ productId: string }, string>(
  "cart/deleteCartItem",
  async (productId, thunkAPI) => {
    try {
      await APIAuthenticated.delete(`/cart/${productId}`);
      return { productId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: initialStateType = {
  cartItems: [] as cartItemsType[],
  error: null,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<cartItemsType[]>) => {
          state.loading = false;
          state.cartItems = action.payload;
        }
      )
      .addCase(addToCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add to cart";
      })
      // fetchUserCart
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserCart.fulfilled,
        (state, action: PayloadAction<cartItemsType[]>) => {
          state.loading = false;
          state.cartItems = action.payload;
        }
      )
      .addCase(fetchUserCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add to cart";
      })
      // updateCart
      .addCase(updateCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCartItems.fulfilled, (state, action) => {
        const item = state.cartItems.find(
          (i) => i.product._id === action.payload.productId
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })

      .addCase(updateCartItems.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add to cart";
      })
      // deleteCartItems
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.product._id !== action.payload.productId
        );
      })

      .addCase(deleteCartItem.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add to cart";
      });
  },
});

export default cartSlice.reducer;
