import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryList } from "./categorySlice";
import styles from "./Category.module.css";
import ToastMessages from "../../Util/ToastMessages";
import CategoryCard from "../../wrapper/CategoryCard/CategoryCard";
import Loading from "../../Util/Loading";

const Category = (props) => {
  const categoryStore = useSelector((state) => state.category);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const onToastClose = () => {
    setShowToast(false);
  };

  useEffect(() => {
    dispatch(getCategoryList());
  }, []);

  useEffect(() => {
    if (!categoryStore.loading && categoryStore.error) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  }, [categoryStore.error]);

  return (
    <div className={styles.mainContainer}>
      <div style={{ textAlign: "center" }}>
        {categoryStore.loading ? <Loading /> : ""}
      </div>
      {showToast ? (
        <ToastMessages
          type="error"
          show={showToast}
          showAnimation={true}
          autoHide={true}
          delay={3000}
          message={categoryStore.error}
          onClose={onToastClose}
        />
      ) : (
        ""
      )}

      {categoryStore &&
      categoryStore.categories &&
      !categoryStore.loading &&
      !categoryStore.error ? (
        <div className={styles.categoryList}>
          {categoryStore.categories.map((category) => {
            return <CategoryCard category={category} key={category._id} />;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Category;
