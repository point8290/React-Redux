import Card from "react-bootstrap/Card";
import styles from "./CartDetail.module.css";
import Button from "react-bootstrap/esm/Button";
import Checkbox from "react-bootstrap/esm/FormCheckInput";
import CheckboxLabel from "react-bootstrap/esm/FormCheckLabel";

function CartDetail(props) {
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
        <Button className={styles.checkoutButton} variant="success">
          Checkout
        </Button>
      </div>
    </Card>
  );
}

export default CartDetail;
