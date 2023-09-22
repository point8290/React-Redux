import Card from "react-bootstrap/Card";
import styles from "./CartDetail.module.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { setIncludeCutlery } from "./cartSlice";
function CartDetail(props) {
  const globalContext = useContext(AppContext);
  const cart = useSelector((state) => state.cart);

  const onCheckout = () => {
    if (cart.cartCount === 0) {
      globalContext.showToastMessage(
        true,
        "Your cart is empty!!",
        "error",
        true,
        3000,
        true
      );

      return;
    }

    if (globalContext.isUserLoggedIn) {
    } else {
      globalContext.setShowLoginPopup(true);
    }
  };
  const dispatch = useDispatch();
  return (
    <Card className={styles.cartCard}>
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>Cart Details</Card.Title>
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
        <Button
          onClick={onCheckout}
          className={styles.checkoutButton}
          variant="success"
        >
          Checkout
        </Button>
      </div>
    </Card>
  );
}

export default CartDetail;
