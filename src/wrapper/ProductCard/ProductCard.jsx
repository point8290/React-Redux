import Card from "react-bootstrap/Card";
import styles from "./ProductCard.module.css";
import Button from "react-bootstrap/Button";
function ProductCard(props) {
  const stylesForProduct = `${styles.productCard}  p-2 m-2`;
  return (
    <Card style={{ width: "18rem" }} className={stylesForProduct}>
      <Card.Img
        className={styles.imageBox}
        variant="top"
        src={props.product.image}
      />
      <Card.Body className={styles.productCardBody}>
        <Card.Title className={styles.wrapToTwoLines}>
          {props.product.title}
        </Card.Title>
        <div className={styles.ratingCountAndPrice}>
          <div className="px-1">${props.product.price}</div>
          <div className="px-1">{props.product.rating.rate} </div>
          <div className="px-1">{props.product.rating.count}</div>
        </div>
        <Card.Text className={styles.wrapToThreeLines}>
          {props.product.description}
        </Card.Text>
      </Card.Body>
      <div className={styles.buttonContainer}>
        <Button variant="primary" className="px-2 py-1 m-2">
          Add to Cart
        </Button>
        <Button variant="success" className="px-2 py-1 m-2">
          Buy Now
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
