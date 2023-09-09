import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./Register.module.css";
import { auth, provider } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setIsUserLoggedIn } from "./userSlice";
import api from "../../api/user";
import ToastMessages from "../../Util/ToastMessages";
function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegisterWithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        createUserInDatabase(() => {
          dispatch(setAccessToken(token));
          dispatch(setIsUserLoggedIn(true));
          localStorage.setItem("isUserLoggedIn", true);

          setEmail("");
          setPassword("");

          navigate("/");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        dispatch(setAccessToken(null));
        dispatch(setIsUserLoggedIn(false));
        localStorage.setItem("isUserLoggedIn", false);
      });
  };

  const createUserInDatabase = async (callback) => {
    const user = { email, password, confirmPassword, phone, name };
    try {
      const response = await api.post("/register", user);
      const data = response.data;
      if (data.status === "ok") {
        callback();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onRegister = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setErrorMsg("Passwords do not match");
      setShowErrorToast(true);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        createUserInDatabase(() => {
          setAccessToken(response.user.accessToken);
          setIsUserLoggedIn(true);
          localStorage.setItem("isUserLoggedIn", true);

          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setPhone("");
          navigate("/");
        });
      })
      .catch((error) => {
        console.log("error", error);
        setAccessToken(null);
        setIsUserLoggedIn(false);
        localStorage.setItem("isUserLoggedIn", false);
      });
  };
  return (
    <Container
      className={styles.mainContainer}
      style={{ width: "100%", maxWidth: "400px", height: "100%" }}
    >
      {showErrorToast && (
        <ToastMessages
          type="Error"
          show={true}
          showAnimation={true}
          message={errorMsg}
        />
      )}
      <div className={styles.registerForm}>
        <div style={{ textAlign: "center", width: "100%" }}>
          <Button
            variant=""
            className={`px-2 py-1 ${styles.button}`}
            onClick={onRegisterWithGoogle}
          >
            <div style={{ margin: "auto" }}>
              <FcGoogle />
              <span className={styles.googleText}> Register with Google</span>
            </div>
          </Button>
        </div>
        <div style={{ textAlign: "center", margin: "10px 0px" }}>
          <strong> Or </strong>
        </div>

        <Form onSubmit={onRegister}>
          <div
            style={{
              textAlign: "center",
              margin: "10px 0px",
              color: "#262626",
            }}
          >
            <strong>Create a new Account</strong>
          </div>

          <Form.Group className="mb-3" controlId="userName">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="userEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="userPhone">
            <Form.Control
              type="phone"
              placeholder="Enter Phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="userPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmUserPassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
          <div className={styles.registerButtons}>
            <Button
              variant=""
              className={`px-2 py-1 ${styles.button}`}
              type="submit"
            >
              <div style={{ margin: "auto" }}>Register</div>
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Register;
