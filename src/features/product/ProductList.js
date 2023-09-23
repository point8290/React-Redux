import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../wrapper/ProductCard/ProductCard";
import { getProductList } from "./productSlice";
import styles from "./ProductList.module.css";
import Loading from "../../Util/Loading";
import ToastMessages from "../../Util/ToastMessages";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams } from "react-router-dom";
import { BiSort, BiFilter } from "react-icons/bi";

const ProductList = (props) => {
  const productStore = useSelector((state) => state.product);
  const [showToast, setShowToast] = useState(false);
  const [sortLabel, setSortLabel] = useState("Action");
  const [filterLabel, setFilterLabel] = useState("All");
  const { category } = useParams();
  const dispatch = useDispatch();
  const onToastClose = () => {
    setShowToast(false);
  };

  useEffect(() => {
    dispatch(getProductList(category));
  }, [category]);

  useEffect(() => {
    if (!productStore.loading && productStore.error) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  }, [productStore.error]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.actionRow}>
        <div className={styles.sortingAction}>
          <span>
            <BiSort size={25} />
          </span>

          <Dropdown as={ButtonGroup}>
            <Button variant="outline-info">{sortLabel}</Button>
            <Dropdown.Toggle split variant="outline-info" id="sort-dropdown" />
            <Dropdown.Menu>
              <Button
                name="Action"
                onClick={(e) => {
                  setSortLabel(e.target.name);
                }}
                variant="link"
                className={styles.dropdownItem}
              >
                Action
              </Button>
              <Button
                name="Another action"
                onClick={(e) => {
                  setSortLabel(e.target.name);
                }}
                variant="link"
                className={styles.dropdownItem}
              >
                Another action
              </Button>
              <Button
                name="Something else"
                onClick={(e) => {
                  setSortLabel(e.target.name);
                }}
                variant="link"
                className={styles.dropdownItem}
              >
                Something else
              </Button>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.filterAction}>
          <span>
            <BiFilter size={30} />
          </span>
          <Dropdown as={ButtonGroup}>
            <Button variant="outline-info">{filterLabel}</Button>
            <Dropdown.Toggle
              split
              variant="outline-info"
              id="filter-dropdown"
            />

            <Dropdown.Menu>
              <Button
                name="All"
                onClick={(e) => {
                  setFilterLabel(e.target.name);
                }}
                variant="link"
                className={styles.dropdownItem}
              >
                All
              </Button>
              <Button
                name="Another action"
                onClick={(e) => {
                  setFilterLabel(e.target.name);
                }}
                variant="link"
                className={styles.dropdownItem}
              >
                Another action
              </Button>
              <Button
                name="Something else"
                onClick={(e) => {
                  setFilterLabel(e.target.name);
                }}
                variant="link"
                className={styles.dropdownItem}
              >
                Something else
              </Button>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div>
        {productStore.loading ? <Loading /> : ""}

        {showToast ? (
          <ToastMessages
            type="error"
            show={showToast}
            showAnimation={true}
            autoHide={true}
            delay={3000}
            message={productStore.error}
            onClose={onToastClose}
          />
        ) : (
          ""
        )}
        {productStore &&
        productStore.products &&
        !productStore.loading &&
        !productStore.error ? (
          productStore.products.length > 0 ? (
            <div className={styles.productList}>
              {productStore.products.map((product) => {
                return (
                  <ProductCard
                    isProductList={true}
                    width="30%"
                    key={product._id}
                    product={product}
                  />
                );
              })}
            </div>
          ) : (
            <h5 style={{ textAlign: "center", height: "100%" }}>
              No Products available in this category.
            </h5>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductList;
