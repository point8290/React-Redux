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

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem("isUserLoggedIn")?.toLowerCase() === "true"
  );
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
    setIsUserLoggedIn,
    setToastObject,
    isUserLoggedIn,
    showLoginPopup,
    setShowLoginPopup,
    showRegisterPopup,
    setShowRegisterPopup,
  };
  return (
    <AppContext.Provider value={globalContext}>{children}</AppContext.Provider>
  );
}

export default AppContextProvider;
