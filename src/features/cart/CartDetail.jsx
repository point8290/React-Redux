import Card from "react-bootstrap/Card";
import styles from "./CartDetail.module.css";
import Button from "react-bootstrap/esm/Button";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import StripeCheckout from "react-stripe-checkout";
import api from "../../api/payment";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../cart/cartSlice";
import orderApi from "../../api/order";

function CartDetail(props) {
  const globalContext = useContext(AppContext);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [stripeToken, setStripeToken] = useState();
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const createOrder = async (data) => {
      const products = [];
      const currentUser = user.user;
      cart.cartProducts.map((product) =>
        products.push({
          productId: product.product._id,
          quantity: product.count,
        })
      );

      return orderApi.post("/", {
        userId: currentUser.uid,
        products,
        amount: data.amount,
      });
    };

    try {
      const makeRequest = () => {
        api
          .post("/checkout", {
            tokenId: stripeToken.id,
            amount: props.grossTotal,
          })
          .then(async (response) => {
            const order = await createOrder(response.data?.response);
            console.log(order);
            navigate("/order", {
              state: { order: order.data, products: cart.cartProducts },
            });

            dispatch(emptyCart());
          })
          .catch((error) => {
            console.log("error", error);
          });
      };
      stripeToken && makeRequest();
    } catch (error) {
      console.log("error", error);
    }
  }, [stripeToken]);

  const onLogin = () => {
    globalContext.setShowRegisterPopup(false);
    globalContext.setShowLoginPopup(true);
  };

  return (
    <Card className={styles.cartCard}>
      <Card.Body>
        <Card.Title
          style={{
            textAlign: "center",
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          Cart Details
        </Card.Title>
        <div>
          <strong> Total Quantity : </strong>
          <span> {props.totalQuantity}</span>
        </div>
        <div>
          <strong> Gross Total : </strong> <span> ₹{props.grossTotal}</span>
        </div>
      </Card.Body>
      <div className={styles.checkoutButtonContainer}>
        {globalContext.isUserLoggedIn ? (
          <StripeCheckout
            name="Bourbon Cafe"
            amount={props.grossTotal * 100}
            currency="INR"
            billingAddress
            shippingAddress={false}
            token={onToken}
            stripeKey={process.env.REACT_APP_STRIPE}
            description={`Your total amount is ${props.grossTotal}`}
          >
            <Button className={styles.checkoutButton} variant="success">
              Proceed to checkout
            </Button>
          </StripeCheckout>
        ) : (
          <Button
            onClick={onLogin}
            className={styles.checkoutButton}
            variant="success"
          >
            Proceed to checkout
          </Button>
        )}
      </div>
    </Card>
  );
}

export default CartDetail;
