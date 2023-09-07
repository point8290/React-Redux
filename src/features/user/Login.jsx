import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";
import { auth, provider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setAccessToken, setIsUserLoggedIn } from "./userSlice";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        console.log("userCreds", userCreds);

        dispatch(setAccessToken(userCreds.user.accessToken));
        dispatch(setIsUserLoggedIn(true));

        setEmail("");
        setPassword("");

        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(setAccessToken(null));
        dispatch(setIsUserLoggedIn(false));
      });
  };

  const onLoginWithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        dispatch(setAccessToken(token));
        dispatch(setIsUserLoggedIn(true));

        setEmail("");
        setPassword("");

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        dispatch(setAccessToken(null));
        dispatch(setIsUserLoggedIn(false));
      });
  };

  return (
    <Container className={styles.mainContainer} style={{ width: "30rem" }}>
      <h5 style={{ textAlign: "center" }}> Login </h5>
      <Form onSubmit={onLogin}>
        <Form.Group className="mb-3" controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div className={styles.buttons}>
          <Button
            variant=""
            className={`px-2 py-1 ${styles.button}`}
            type="submit"
          >
            Login
          </Button>
          <Button
            variant=""
            className={`px-2 py-1 ${styles.button}`}
            onClick={onLoginWithGoogle}
          >
            <FcGoogle />
            <span className={styles.googleText}> Login with Google</span>
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
