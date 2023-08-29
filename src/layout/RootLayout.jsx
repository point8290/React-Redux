import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./../store";

function RootLayout() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </Provider>
  );
}

export default RootLayout;
