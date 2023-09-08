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
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLoginWithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        dispatch(setAccessToken(token));
        dispatch(setIsUserLoggedIn(true));
        localStorage.setItem("isUserLoggedIn", true);

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
        localStorage.setItem("isUserLoggedIn", false);
      });
  };
  const onRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log("response", response);

        setAccessToken(response.user.accessToken);
        setIsUserLoggedIn(true);
        localStorage.setItem("isUserLoggedIn", true);

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        setAccessToken(null);
        setIsUserLoggedIn(false);
        localStorage.setItem("isUserLoggedIn", false);
      });
  };
  return (
    <Container className={styles.mainContainer} style={{ width: "30rem" }}>
      <Form onSubmit={onRegister}>
        <h4 style={{ textAlign: "center" }}> Create a new Account </h4>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Name</Form.Label>
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
        <Form.Group className="mb-3" controlId="userPhone">
          <Form.Label>Phone</Form.Label>
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
        <Form.Group className="mb-3" controlId="confirmUserPassword">
          <Form.Label>Confirm Password</Form.Label>
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
            Register
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

export default Register;
