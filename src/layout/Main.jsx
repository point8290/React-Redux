import React from "react";
import ProductList from "../features/product/ProductList";
import Sidebar from "./Sidebar";
import styles from "./Main.module.css";
import Category from "../features/Category/Category";

function Main() {
  return (
    <div className={styles.mainContainer}>
      <Category className={styles.categoryListContainer} />

      {/* <div className={styles.sideBar}>
        <Sidebar />
      </div>
      <div className={styles.productListContainer}>
        <ProductList />
      </div> */}
    </div>
  );
}

export default Main;
