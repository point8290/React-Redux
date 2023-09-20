import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";
import { Container } from "react-bootstrap";
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
    <div>
      <Header />
      <main>
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
        <div className={styles.mainContainer}>
          <Container className={styles.sideBar}>
            <Sidebar />
          </Container>
          <Container className={styles.outletContainer}>
            <Outlet />
          </Container>
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
