import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../wrapper/ProductCard/ProductCard";
import { getProductList } from "./productSlice";
import styles from "./ProductList.module.css";
import Loading from "../../Util/Loading";
import ToastMessages from "../../Util/ToastMessages";

const ProductList = (props) => {
  const productStore = useSelector((state) => state.product);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const onToastClose = () => {
    setShowToast(false);
  };

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  useEffect(() => {
    if (!productStore.loading && productStore.error) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  }, [productStore.error]);

  return (
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
        <div className={styles.productList}>
          {productStore.products.map((product) => {
            return (
              <ProductCard
                isProductList={true}
                width="45%"
                key={product._id}
                product={product}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductList;
