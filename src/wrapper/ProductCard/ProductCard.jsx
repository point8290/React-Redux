import Card from "react-bootstrap/Card";
import styles from "./ProductCard.module.css";
import Button from "react-bootstrap/Button";
function ProductCard(props) {
  const stylesForProduct = `${styles.productCard}  p-3 m-2`;
  return (
    <Card className={stylesForProduct}>
      <Card.Img
        className={styles.imageBox}
        variant="top"
        src={props.product.image}
      />
      <Card.Body className={styles.productCardBody}>
        <Card.Title className={styles.wrapToTwoLines}>
          {props.product.name}
        </Card.Title>
        <div className={styles.ratingCountAndPrice}>
          <div className="px-1">${props.product.price}</div>
        </div>
        <Card.Text className={styles.wrapToThreeLines}>
          {props.product.description}
        </Card.Text>
        <div className={styles.buttonContainer}>
          <Button variant="" className={styles.button}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
