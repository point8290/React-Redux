import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import ReactDOM from "react-dom";
function ToastMessages(props) {
  const [showToast, setShowToast] = useState(props.show);
  let backgroundColor = "bg-dark";
  let headerStyle = {};
  if (props.type === "Error") {
    backgroundColor = "text-danger";
    headerStyle = { color: "black", background: "#F45050" };
  }
  const closeToastMessage = () => {
    setShowToast(false);
  };
  return ReactDOM.createPortal(
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
      <Toast
        show={showToast}
        animation={props.showAnimation}
        autohide={props.autohide}
        delay={props.delay || 1000}
        onClose={closeToastMessage}
      >
        <Toast.Header style={headerStyle}>
          <strong className="me-auto">{props.type}</strong>
          <small className="text-muted">{props.timestamp}</small>
        </Toast.Header>
        <Toast.Body className={backgroundColor}>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>,
    document.getElementById("toast-msg")
  );
}

export default ToastMessages;
