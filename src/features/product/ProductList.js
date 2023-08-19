import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  productRequest,
  productRequestFailure,
  productRequestSuccess,
} from "./productSlice";
import api from "../../api/product";
const ProductList = (props) => {
  const dispatch = useDispatch();
  const productStore = useSelector((state) => state);

  useEffect(() => {
    dispatch(productRequest(true));
    api
      .get("/", {})
      .then((res) => {
        dispatch(productRequestSuccess(res.json()));
      })
      .catch((error) => {
        dispatch(productRequestFailure(error));
      });
  }, []);
  return <div>ProductList</div>;
};

export default ProductList;
