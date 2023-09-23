import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";
import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";
import ToastMessages from "../Util/ToastMessages";
import Login from "../features/user/Login";
import Register from "../features/user/Register";
function RootLayout() {
  const globalContext = useContext(AppContext);

  const mainClasses = ` ${
    globalContext.showLoginPopup || globalContext.showRegisterPopup
      ? styles.modalContainer
      : ""
  }`;

  return (
    <div style={{ height: " 100vh" }}>
      <Header />
      <main style={{ height: "-webkit-fill-available" }}>
        {globalContext.toastObject.showToast && (
          <ToastMessages
            type={globalContext.toastObject.messageType}
            show={true}
            showAnimation={globalContext.toastObject.showAnimation}
            autoHide={globalContext.toastObject.autoHide}
            delay={globalContext.toastObject.delay}
            message={globalContext.toastObject.message}
          />
        )}

        <div className={mainClasses}>
          {globalContext.showLoginPopup && <Login />}
          {globalContext.showRegisterPopup && <Register />}
        </div>

        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
