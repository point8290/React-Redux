import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Order.module.css";
import { GiPartyPopper } from "react-icons/gi";
function Order(props) {
  const location = useLocation();
  const orderData = location.state.order;

  return (
    <div className={styles.topSection}>
      <GiPartyPopper size={200} />
      <h3>Order successfull !!</h3>
      <p>
        Your order id is :{orderData._id}, Please collect order from Canteen in
        10-15 minutes. Thanks
      </p>
    </div>
  );
}

export default Order;
