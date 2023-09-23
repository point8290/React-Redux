import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import CartItem from "../../wrapper/CartItem/CartItem";
import styles from "./Cart.module.css";
import CartDetail from "./CartDetail";
import { AppContext } from "../../context/AppContextProvider";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState({
    totalQuantity: 0,
    grossTotal: 0,
  });
  const cartProducts =
    cart.cartCount === 0 ? (
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}
      >
        No items in cart
      </div>
    ) : (
      <div className={styles.productList}>
        {cart.cartProducts?.map((product) => {
          return (
            <CartItem
              width="100%"
              key={product.product._id}
              product={product.product}
              quantity={product.count}
            />
          );
        })}
      </div>
    );
  useEffect(() => {
    const getResult = () => {
      let count = cart.cartProducts?.reduce((count, product) => {
        count += product.count;
        return count;
      }, 0);
      let total = cart.cartProducts?.reduce((total, product) => {
        total += product.count * product.product.price;
        return total;
      }, 0);
      const result = { totalQuantity: count, grossTotal: total };

      return result;
    };

    const result = getResult();
    setCartData({
      grossTotal: result.grossTotal,
      totalQuantity: result.totalQuantity,
    });
  }, [cart.cartCount]);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartProductContainer}>{cartProducts}</div>
      {cart.cartCount > 0 && (
        <div style={{ width: "60%" }}>
          <div className={styles.cartDetailsContainer}>
            <CartDetail {...cartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
