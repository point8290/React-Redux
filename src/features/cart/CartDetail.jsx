import Card from "react-bootstrap/Card";
import styles from "./CartDetail.module.css";
import Button from "react-bootstrap/esm/Button";
import Checkbox from "react-bootstrap/esm/FormCheckInput";
import CheckboxLabel from "react-bootstrap/esm/FormCheckLabel";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";

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

  return (
    <Card className={styles.cartCard}>
      <Card.Body>
        <Card.Title>Cart Items</Card.Title>
        <div>
          <strong> Total Quantity : </strong>
          <span> {props.totalQuantity}</span>
        </div>
        <div>
          <strong> Gross Total : </strong> <span> {props.grossTotal}</span>
        </div>
        <div>
          <Checkbox style={{ border: "1px solid black" }} /> &nbsp;
          <CheckboxLabel> Include cutlery </CheckboxLabel>
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
