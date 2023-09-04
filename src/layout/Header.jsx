import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Header.module.css";
function Header() {
  return (
    <Container className={styles.headerBackground}>
      <Navbar expand="lg" className="px-2 my-1">
        <Navbar.Brand className={styles.brandTitle} href="/">
          Clothing Merchandise by Krishna{" "}
        </Navbar.Brand>

        <Form className={styles.searchBarForm} inline>
          <Row>
            <Col xs="auto" className={styles.searchBarWidth}>
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
              />
            </Col>
          </Row>
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={styles.navbarCollapse}
        >
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login"> Login </Nav.Link>
            <Nav.Link href="/register"> Register </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default Header;
