/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../http";

type ProductType = {
  _id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
};

type CartItemType = {
  quantity: number;
  product: ProductType;
};

type cartStateType = {
  cart: CartItemType[];
  loading: boolean;
  error: string | null;
};
type UpdateCartType = {
  productId: string;
  quantity: number;
};
type UpdateCartResponse = {
  productId: string;
  quantity: number;
};

const initialState: cartStateType = {
  cart: [],
  loading: false,
  error: null,
};

export const addToCart = createAsyncThunk<
  CartItemType[], //response type
  string, //productId type
  { rejectValue: string }
>("cart/addToCart", async (productId, thunkAPI) => {
  try {
    const response = await APIAuthenticated.post(`/cart/${productId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to add product to cart");
  }
});

export const getCartItems = createAsyncThunk<CartItemType[], void>(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      const response = await APIAuthenticated.get("/cart/getCartItems");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to get cart items");
    }
  }
);

export const updateCartItems = createAsyncThunk<
  UpdateCartResponse,
  UpdateCartType
>("cart/updateCartItems", async (data, thunkAPI) => {
  try {
    const response = await APIAuthenticated.patch(
      `/cart/${data.productId}`,
      // data.quantity
      { quantity: data.quantity }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to update cart itemsF");
  }
});

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
        (state, action: PayloadAction<CartItemType[]>) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )
      .addCase(addToCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add to cart";
      })

      // getCartItems
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getCartItems.fulfilled,
        (state, action: PayloadAction<CartItemType[]>) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )
      .addCase(getCartItems.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to get cart items";
      })

      // update cart
      .addCase(updateCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cart.findIndex(
          (item) => item.product._id === action.payload.productId
        );
        if (index !== -1) {
          state.cart[index].quantity = action.payload.quantity;
        }
      })
      .addCase(updateCartItems.rejected, (state) => {
        state.loading = false;
        state.error = "Update failed";
      });
  },
});

export default cartSlice.reducer;
