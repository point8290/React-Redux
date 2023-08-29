import Card from "react-bootstrap/Card";
import styles from "./ProductCard.module.css";
import Button from "react-bootstrap/Button";
function ProductCard(props) {
  console.log(props);

  const stylesForProduct = `${styles.productCardBorder} p-2 m-2`;
  return (
    <Card style={{ width: "18rem" }} className={stylesForProduct}>
      <Card.Img
        className={styles.imageBox}
        variant="top"
        src={props.product.image}
      />
      <Card.Body>
        <Card.Title>{props.product.title}</Card.Title>
        <Card.Text className={styles.wrapToTwoLines}>
          {props.product.description}
        </Card.Text>
        <div className={styles.buttonContainer}>
          <Button variant="primary" className="p-2 m-2">
            Add to Cart
          </Button>
          <Button variant="success" className="p-2 m-2">
            Buy Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
