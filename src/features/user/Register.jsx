import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ImCross } from "react-icons/im";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/user";
import { AppContext } from "../../context/AppContextProvider";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { loginWithGoogle } from "./googleAuthentication";
import { useDispatch } from "react-redux";
import { setAccessToken } from "./userSlice";
import ReactDOM from "react-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const globalContext = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hidePopup = () => {
    globalContext.setShowRegisterPopup(false);
  };

  const loginWithGoogleCallback = (token) => {
    if (token) {
      dispatch(setAccessToken(token));
      localStorage.setItem("isUserLoggedIn", true);
      globalContext.setIsUserLoggedIn(true);
    } else {
      dispatch(setAccessToken(null));
      localStorage.setItem("isUserLoggedIn", false);
      globalContext.setIsUserLoggedIn(false);
    }
    globalContext.setShowRegisterPopup(false);

    globalContext.showToastMessage(
      true,
      "Signed In Successfully !!",
      "success",
      true,
      3000,
      true
    );

    navigate("/");
  };
  const onRegister = async (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      globalContext.showToastMessage(
        true,
        "Passwords do not match",
        "error",
        true,
        5000,
        true
      );
      return;
    }
    const user = {
      email,
      password,
    };
    try {
      api
        .post("/register", user)
        .then((response) => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          if (response && response.data) {
            globalContext.setShowRegisterPopup(false);

            globalContext.showToastMessage(
              true,
              response.data.message,
              "success",
              true,
              3000,
              true
            );
          }

          navigate("/");
        })
        .catch((error) => {
          const errorMsg = error.data ? error.data.message : error.message;
          globalContext.showToastMessage(true, errorMsg, "error");
        });
    } catch (error) {
      console.log("error", error);
      globalContext.showToastMessage(
        true,
        "Some error occured, Please Try again",
        "error"
      );
    }
  };

  return ReactDOM.createPortal(
    <Container className={styles.registerContainer}>
      <div className={styles.crossButton}>
        <Button variant="">
          <ImCross onClick={hidePopup} />
        </Button>
      </div>
      <div className={styles.registerForm}>
        <Form onSubmit={onRegister}>
          <div className={styles.registerHeading}>
            <strong style={{ fontSize: "25px" }}>Create a new account</strong>
          </div>

          <Form.Group controlId="userEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="my-3" controlId="userPassword">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmUserPassword">
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>

          <div style={{ textAlign: "center", marginBottom: "5px" }}>
            Already have an account? &nbsp;
            <Button
              variant=""
              style={{
                fontSize: "14px",
                color: "#3085C3",
              }}
              onClick={(e) => {
                globalContext.setShowRegisterPopup(false);
                globalContext.setShowLoginPopup(true);
              }}
            >
              Please Login
            </Button>
          </div>

          <div className={styles.registerButtons}>
            <Button
              variant="primary"
              className={`px-2 py-1 ${styles.button}`}
              type="submit"
            >
              <div style={{ margin: "auto" }}>Register</div>
            </Button>
          </div>
          <hr />
          <div style={{ textAlign: "center", width: "100%" }}>
            <Button
              variant=""
              className={`px-2 py-1 ${styles.button}`}
              onClick={(e) => {
                loginWithGoogle(loginWithGoogleCallback);
              }}
            >
              <div className={styles.loginWithGoogleButton}>
                <FcGoogle size={24} />
                <span className={styles.googleText}> Login with google</span>
              </div>
            </Button>
          </div>
        </Form>
      </div>
    </Container>,
    document.getElementById("modal-portal")
  );
}

export default Register;
