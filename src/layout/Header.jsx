import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Header.module.css";
function Header() {
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Clothing Merchandise by Krishna </Navbar.Brand>

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
              <Nav.Link href="/profile"> Your Account </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Header;
