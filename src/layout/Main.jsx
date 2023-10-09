import React from "react";
import styles from "./Main.module.css";
import Category from "../features/Category/Category";

function Main() {
  return (
    <div className={styles.mainContainer}>
      <Category className={styles.categoryListContainer} />
    </div>
  );
}

export default Main;
