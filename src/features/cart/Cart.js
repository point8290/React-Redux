import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  increaseProductCount,
  decreaseProductCount,
} from "./cartSlice";

const Cart = (props) => {
  const cart = useSelector((state) => state.cartProducts);
  const dispatch = useDispatch();
  return <div>Cart</div>;
};

export default Cart;
