import Card from "react-bootstrap/Card";
import styles from "./CartDetail.module.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { setIncludeCutlery } from "./cartSlice";
import StripeCheckout from "react-stripe-checkout";
import api from "../../api/payment";
function CartDetail(props) {
  const globalContext = useContext(AppContext);
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState();
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    try {
      const makeRequest = async () => {
        const response = await api.post("/checkout", {
          tokenId: stripeToken.id,
          amount: props.grossTotal,
        });
        console.log("response.data", response.data);
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
  const dispatch = useDispatch();
  const key = process.env.REACT_APP_STRIPE;
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
        <div>
          <Form>
            <Form.Check
              checked={cart.includeCutlery}
              type="switch"
              id="cutlery-switch"
              label="Include cutlery"
              onChange={() => {
                dispatch(setIncludeCutlery(!cart.includeCutlery));
              }}
            />
          </Form>
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
            stripeKey={key}
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
