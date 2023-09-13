import React, { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext({});

function AppContextProvider({ children }) {
  const [toastObject, setToastObject] = useState({
    message: "",
    messageType: "",
    showToast: false,
    autohide: false,
    delay: 3000,
    showAnimation: true,
  });
  const showToastMessage = function (
    show,
    msg,
    msgType,
    autohide = true,
    delay = 3000,
    showAnimation = true
  ) {
    globalContext.setToastObject({
      message: msg,
      messageType: msgType,
      showToast: show,
      autohide: autohide,
      delay: delay,
      showAnimation: showAnimation,
    });
    setTimeout(() => {
      globalContext.setToastObject({
        message: "",
        messageType: "",
        showToast: false,
        autohide: false,
        delay: 3000,
        showAnimation: true,
      });
    }, delay);
  };
  const globalContext = {
    showToastMessage,
    toastObject,
    setToastObject,
  };
  return (
    <AppContext.Provider value={globalContext}>{children}</AppContext.Provider>
  );
}

export default AppContextProvider;
