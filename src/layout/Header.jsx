import Navbar from "react-bootstrap/Navbar";
import { Button, Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setIsUserLoggedIn } from "../features/user/userSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
function Header(props) {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    signOut(auth)
      .then((response) => {
        dispatch(setAccessToken(null));
        dispatch(setIsUserLoggedIn(false));
        localStorage.setItem("isUserLoggedIn", false);

        navigate("/login");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const hideLoginButton = user.isUserLoggedIn ? styles.hide : "";
  const hideRegisterButton = user.isUserLoggedIn ? styles.hide : "";
  const hideLogoutButton = !user.isUserLoggedIn
    ? styles.hide
    : styles.buttonItem + " px-2 py-0";

  return (
    <Container className={styles.headerBackground}>
      <Navbar expand="lg" className="px-2 my-1">
        <Navbar.Brand
          className={styles.brandTitle}
          onClick={(e) => {
            navigate("/");
          }}
        >
          Clothing Merchandise by Krishna
        </Navbar.Brand>

        <Form className={styles.searchBarForm}>
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
          <Nav className={`"me-auto " + ${styles.linksContainer} `}>
            <Button
              onClick={(e) => {
                navigate("/");
              }}
              className={`bg-transparent ${styles.buttonBackground}`}
            >
              Home
            </Button>
            <Button
              className={`bg-transparent ${hideLoginButton} ${styles.buttonBackground}`}
              onClick={(e) => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              className={`bg-transparent ${hideRegisterButton} ${styles.buttonBackground}`}
              onClick={(e) => {
                navigate("/register");
              }}
            >
              Register
            </Button>
            <Button
              onClick={(e) => {
                navigate("/cart");
              }}
              className={`bg-transparent ${styles.buttonBackground}`}
            >
              <AiOutlineShoppingCart /> <span>{cart.cartCount}</span>
            </Button>
            <Button
              className={hideLogoutButton}
              variant="danger"
              onClick={onLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default Header;
