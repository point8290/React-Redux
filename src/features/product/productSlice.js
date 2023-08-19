import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productRequest: (state, action) => {
      state.loading = true;
      state.error = "";
      if (action.payload) {
        state.products = [];
      }
    },
    productRequestSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.products.concat(action.payload);
    },

    productRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productRequest, productRequestFailure, productRequestSuccess } =
  productSlice.actions;

export default productSlice.reducer;
