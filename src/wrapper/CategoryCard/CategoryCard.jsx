import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import styles from "./CategoryCard.module.css";
import { useNavigate } from "react-router-dom";

function CategoryCard(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const categoryContainer = `${styles.categoryCard}  p-3 m-2`;
  const handleCategoryClick = () => {
    navigate(`/products/${props.category._id}`);
  };

  return (
    <Card onClick={handleCategoryClick} className={categoryContainer}>
      <Card.Img
        className={styles.imageBox}
        variant="top"
        src={props.category.image}
      />
      <Card.Body className={styles.categoryCardBody}>
        <Card.Title className={styles.wrapToTwoLines}>
          {props.category.name}
        </Card.Title>

        <Card.Text className={styles.wrapToThreeLines}>
          {props.category.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CategoryCard;
