import React from "react";
import styles from "./Loading.module.css";
const loadingIndicator = {
  textAlign: "center",
  margin: "auto",
};
function Loading() {
  return (
    <div style={loadingIndicator}>
      <div className={styles.loader}></div>
      <span className={styles.loadingText}> Loading ...</span>
    </div>
  );
}

export default Loading;
