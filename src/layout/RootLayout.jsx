import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";
import { Container } from "react-bootstrap";

function RootLayout() {
  return (
    <div>
      <Header />
      <main className={styles.mainContainer}>
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
