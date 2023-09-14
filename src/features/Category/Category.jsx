import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryList } from "./categorySlice";
import styles from "./Category.module.css";
import Loading from "../../Util/Loading";
import ToastMessages from "../../Util/ToastMessages";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
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
    <div>
      {categoryStore.loading ? <Loading /> : ""}
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
            return (
              <div key={category._id} className={styles.categoryItem}>
                <Link
                  className={styles.categoryItemLink}
                  to={`/category/${category._id}`}
                >
                  {category.name} <FaAngleRight />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Category;
