import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import orderReducer from "./slice/orderSlice";
import userReducer from "./slice/userSlice";
import productReducer from "./slice/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    user: userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
