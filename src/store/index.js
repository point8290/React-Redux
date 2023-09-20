import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/Category/categorySlice";

import userReducer from "../features/user/userSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    category: categoryReducer,
  },
});
export default store;
