import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";
import { Container } from "react-bootstrap";
import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";
import ToastMessages from "../Util/ToastMessages";
function RootLayout() {
  const globalContext = useContext(AppContext);

  return (
    <div>
      <Header />
      <main className={styles.mainContainer}>
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

        <Container className={styles.sideBar}>
          <Sidebar />
        </Container>
        <Container className={styles.outletContainer}>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export default RootLayout;
