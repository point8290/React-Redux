import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Register.module.css";
function Register() {
  return (
    <Container className={styles.mainContainer} style={{ width: "30rem" }}>
      <Form>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="phone" placeholder="Enter Phone number" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmUserPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>
        <div className={styles.registerButtons}>
          <Button variant="primary" type="submit">
            Register
          </Button>
          <Button variant="success">Register with Google</Button>
        </div>
      </Form>
    </Container>
  );
}

export default Register;
