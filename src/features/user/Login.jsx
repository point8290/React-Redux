import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Login.module.css";

function Login() {
  return (
    <Container className={styles.mainContainer} style={{ width: "30rem" }}>
      <Form>
        <Form.Group className="mb-3" controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="remeberMeCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
