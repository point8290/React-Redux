import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/product";

const initialState = {
  loading: false,
  products: [],
  error: "",
};
const productSlice = createSlice({
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
      action.payload?.forEach((product) => {
        state.products.push(product);
      });
    },

    productRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;

export const { productRequest, productRequestFailure, productRequestSuccess } =
  productSlice.actions;

export const getProductList = function (categoryId) {
  return (dispatch, getState) => {
    dispatch(productRequest(true));
    api
      .get(`/${categoryId}`)
      .then((response) => {
        console.log("response", response);
        dispatch(productRequestSuccess(response.data.products));
      })
      .catch((error) => {
        dispatch(productRequestFailure(error.message));
      });
  };
};
