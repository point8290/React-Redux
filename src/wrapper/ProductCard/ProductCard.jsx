import Card from "react-bootstrap/Card";
import styles from "./ProductCard.module.css";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  addProduct,
  increaseProductCount,
  decreaseProductCount,
} from "../../features/cart/cartSlice";

function ProductCard(props) {
  const dispatch = useDispatch();
  const stylesForProduct = `${styles.productCard}  p-3 m-2`;
  const cart = useSelector((store) => store.cart);

  const getProductCount = (productId) => {
    let product = cart.cartProducts.filter((product) => {
      return product.product._id === productId;
    });
    if (product.length > 0) {
      return product[0].count;
    }
    return 0;
  };
  const productCardWidth = {
    width: props.width,
  };
  return (
    <Card style={productCardWidth} className={stylesForProduct}>
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
          {getProductCount(props.product._id) === 0 ? (
            <Button
              variant=""
              className={styles.button}
              onClick={() => {
                dispatch(addProduct(props.product));
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <div className={styles.plusMinusButton}>
              <Button
                variant=""
                className={styles.button}
                onClick={() => {
                  dispatch(decreaseProductCount(props.product._id));
                }}
              >
                <FaMinus />
              </Button>
              <div className={styles.productCount}>
                <span> {getProductCount(props.product._id)} </span>
              </div>
              <Button
                variant=""
                className={styles.button}
                onClick={() => {
                  dispatch(increaseProductCount(props.product._id));
                }}
              >
                <FaPlus />
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
