import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function Order(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderData = location.state.order;

  return <div>Order</div>;
}

export default Order;
