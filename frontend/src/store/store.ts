// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";
// import productReducer from "./productSlice";

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     product: productReducer,
//   },
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
