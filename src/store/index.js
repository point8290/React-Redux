import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/Category/categorySlice";
import userReducer from "../features/user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  user: userReducer,
  category: categoryReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
