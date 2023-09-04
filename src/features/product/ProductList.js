import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../wrapper/ProductCard/ProductCard";
import { getProductList } from "./productSlice";
import styles from "./ProductList.module.css";
import Loading from "../../Util/Loading";
import Error from "../../Util/Error";
const ProductList = (props) => {
  const productStore = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  return (
    <div>
      {productStore.loading ? <Loading /> : ""}

      {productStore.error ? <Error error={productStore.error} /> : ""}

      {productStore &&
      productStore.products &&
      !productStore.loading &&
      !productStore.error ? (
        <div className={styles.productList}>
          {productStore.products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductList;
