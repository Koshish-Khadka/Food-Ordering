/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../http";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type productId = string;

export const addToCart = createAsyncThunk<
  any,
  productId,
  { rejectValue: string }
>("cart/addToCart", async (productId, thunkAPI) => {
  try {
    const response = await APIAuthenticated.post(`/cart/${productId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to add product to cart");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartloading: false,
    carterror: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.cartloading = true;
        state.carterror = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartloading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.cartloading = false;
        state.carterror = "Failed to add to cart";
      });
  },
});

// export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
