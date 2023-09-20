import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/category";

const initialState = {
  loading: false,
  categories: [],
  error: "",
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryRequest: (state, action) => {
      state.loading = true;
      state.error = "";
      if (action.payload) {
        state.categories = [];
      }
    },
    categoryRequestSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      action.payload.forEach((category) => {
        state.categories.push(category);
      });
    },

    categoryRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default categorySlice.reducer;

export const {
  categoryRequest,
  categoryRequestFailure,
  categoryRequestSuccess,
} = categorySlice.actions;

export const getCategoryList = function () {
  return (dispatch, getState) => {
    dispatch(categoryRequest(true));
    api
      .get("/categories")
      .then((response) => {
        dispatch(categoryRequestSuccess(response.data.categories));
      })
      .catch((error) => {
        dispatch(categoryRequestFailure(error.message));
      });
  };
};
