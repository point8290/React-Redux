import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { setAccessToken } from "../features/user/userSlice";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { FaFirstOrder } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { emptyCart } from "../features/cart/cartSlice";
function Header(props) {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const globalContext = useContext(AppContext);
  const dispatch = useDispatch();
  const onLogout = () => {
    signOut(auth)
      .then((response) => {
        dispatch(setAccessToken(null));
        localStorage.setItem("isUserLoggedIn", false);
        globalContext.setIsUserLoggedIn(false);
        dispatch(emptyCart());
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const onLogin = () => {
    globalContext.setShowRegisterPopup(false);

    globalContext.setShowLoginPopup(true);
  };

  const onRegister = () => {
    globalContext.setShowLoginPopup(false);

    globalContext.setShowRegisterPopup(true);
  };
  const onProfile = () => {};
  const onOrders = () => {};

  const hideLoginButton = globalContext.isUserLoggedIn ? styles.hide : "";
  const hideRegisterButton = globalContext.isUserLoggedIn ? styles.hide : "";

  const showAfterLoginButtons = !globalContext.isUserLoggedIn
    ? styles.hide
    : styles.buttonItem + " px-1 mx-1 py-0";

  return (
    <div className={styles.headerBackground}>
      <Navbar collapseOnSelect expand="lg">
        <Container fluid className={styles.navbarContainer}>
          <div>
            <Navbar.Brand
              className={styles.brandTitle}
              onClick={(e) => {
                navigate("/");
              }}
            >
              Bourbon Cafe
            </Navbar.Brand>
          </div>
          <Form className={styles.searchBarForm}>
            <Row>
              <Col xs="auto" className={styles.searchBarWidth}>
                <Form.Control
                  type="text"
                  placeholder="Search food categories, dishes ..."
                  className=" mr-sm-2"
                />
              </Col>
            </Row>
          </Form>
          <Navbar.Toggle
            style={{ background: "white" }}
            aria-controls={`offcanvasNavbar-expand-xxl`}
          />
          <Navbar.Offcanvas
            id="headerBar"
            className={styles.navbarCollapse}
            placement="end"
            style={{ width: "250px" }}
          >
            <Offcanvas.Header className={styles.offcanvasTitle} closeButton>
              <Offcanvas.Title>Bourbon Cafe</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={styles.offcanvasBody}>
              <Nav className="flex-grow-1 pe-3">
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
                  onClick={onLogin}
                >
                  Login
                </Button>
                <Button
                  className={`bg-transparent ${hideRegisterButton} ${styles.buttonBackground}`}
                  onClick={onRegister}
                >
                  Register
                </Button>
                <Button
                  onClick={(e) => {
                    navigate("/cart");
                  }}
                  className={`bg-transparent ${styles.buttonBackground} ${styles.cartButton}`}
                >
                  <AiOutlineShoppingCart size={20} />
                  <Badge bg="dark">{cart.cartCount}</Badge>
                </Button>
                <Button
                  className={`bg-transparent ${styles.buttonBackground} ${showAfterLoginButtons}`}
                  variant=""
                  onClick={onOrders}
                >
                  <FaFirstOrder /> <span> Orders</span>
                </Button>
                <Button
                  className={`bg-transparent ${styles.buttonBackground} ${showAfterLoginButtons}`}
                  variant=""
                  onClick={onProfile}
                >
                  <AiOutlineUser /> <span> Profile</span>
                </Button>
                <Button
                  className={showAfterLoginButtons}
                  variant="danger"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
