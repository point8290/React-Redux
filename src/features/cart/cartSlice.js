import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  cartCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = state.cartProducts.find(
        (product) => product.product._id === action.payload._id
      );

      if (product) {
        product.count += 1;
      } else {
        state.cartProducts.push({ product: action.payload, count: 1 });
      }

      state.cartCount = state.cartCount + 1;
    },

    removeProduct: (state, action) => {
      const product = state.cartProducts.find(
        (product) => product.product._id === action.payload._id
      );
      const indexToBeRemoved = state.cartProducts.findIndex(
        (product) => product.product._id === action.payload._id
      );

      if (indexToBeRemoved !== -1) {
        state.cartProducts.slice(indexToBeRemoved, 1);
      }

      state.cartCount = state.cartCount - product.product.count;
    },

    increaseProductCount: (state, action) => {
      const product = state.cartProducts.find(
        (product) => product.product._id === action.payload
      );
      product.count += 1;
      state.cartCount = state.cartCount + 1;
    },

    decreaseProductCount: (state, action) => {
      const product = state.cartProducts.find(
        (product) => product.product._id === action.payload
      );
      product.count -= 1;

      const indexToBeRemoved = state.cartProducts.findIndex(
        (product) => product.product._id === action.payload
      );
      if (indexToBeRemoved !== -1) {
        state.cartProducts.slice(indexToBeRemoved, 1);
      }

      state.cartCount = state.cartCount - 1;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseProductCount,
  decreaseProductCount,
} = cartSlice.actions;

export default cartSlice.reducer;
