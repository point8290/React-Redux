import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
  },
});
export default store;
