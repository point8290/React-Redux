import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import ReactDOM from "react-dom";
import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";
function ToastMessages(props) {
  let title = "Alert";

  let backgroundColor = "bg-dark";
  let headerStyle = {};

  if (props.type === "error") {
    backgroundColor = "text-danger";
    headerStyle = { color: "black", background: "#F45050" };
    title = "Error";
  } else if (props.type === "success") {
    backgroundColor = "text-success";
    headerStyle = { color: "black", background: "#A6FF96" };
    title = "Success";
  }
  const globalContext = useContext(AppContext);

  const closeToastMessage = () => {
    globalContext.setToastObject({
      message: "",
      messageType: "",
      showToast: false,
      autohide: false,
      delay: 3000,
      showAnimation: true,
    });
  };

  return ReactDOM.createPortal(
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
      <Toast
        show={props.show}
        animation={props.showAnimation}
        autohide={props.autohide}
        delay={props.delay || 3000}
        onClose={props.onClose ? props.onClose : closeToastMessage}
      >
        <Toast.Header style={headerStyle}>
          <strong className="me-auto">{title}</strong>
          <small className="text-muted">{props.timestamp}</small>
        </Toast.Header>
        <Toast.Body className={backgroundColor}>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>,
    document.getElementById("toast-msg")
  );
}

export default ToastMessages;
