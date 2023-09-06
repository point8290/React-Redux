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
      state.cartProducts.push(action.payload);
      state.cartCount += 1;
    },

    removeProduct: (state, action) => {
      let indexToBeRemoved = -1;

      for (let index = 0; index < state.cartProducts.length; index++) {
        const product = state.cartProducts[index];
        if (product.id === action.payload) {
          indexToBeRemoved = index;
          break;
        }
      }
      state.cartCount -= state.cartProducts[indexToBeRemoved].count;
      if (indexToBeRemoved !== -1) {
        state.cartProducts.slice(indexToBeRemoved, 1);
      }
    },

    increaseProductCount: (state, action) => {
      for (let index = 0; index < state.cartProducts.length; index++) {
        const product = state.cartProducts[index];
        if (product.id === action.payload) {
          product.count += 1;
          break;
        }
      }
      state.cartCount += 1;
    },

    decreaseProductCount: (state, action) => {
      for (let index = 0; index < state.cartProducts.length; index++) {
        const product = state.cartProducts[index];
        if (product.id === action.payload) {
          product.count -= 1;
          break;
        }
      }
      state.cartCount -= 1;
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
