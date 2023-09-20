import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { loginWithGoogle } from "./googleAuthentication";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";
import api from "../../api/user";
import { setAccessToken } from "./userSlice";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import {
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../firebase";

function Login(props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loginWithEmail, setLoginWithEmail] = useState(true);
  const [finalResult, setFinalResult] = useState(null);
  const [showVerificationCodeField, setShowVerificationCodeField] =
    useState(false);
  const [showPasswordField, setShowPasswordField] = useState(true);
  const globalContext = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginWithGoogleCallback = (token) => {
    dispatch(setAccessToken(token));
    localStorage.setItem("isUserLoggedIn", true);
    globalContext.setIsUserLoggedIn(true);
    globalContext.setShowLoginPopup(false);

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

  const setUpRecaptcha = () => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        callback: (response) => {
          recaptchaVerifier.clear();
        },
      }
    );

    recaptchaVerifier.render();

    return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  };
  const ValidateOtp = () => {
    if (otp === null || finalResult === null) return;

    finalResult
      .confirm(otp)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        globalContext.showToastMessage(
          true,
          "Wrong OTP",
          "error",
          true,
          3000,
          true
        );
      })
      .finally(() => {
        setFinalResult(null);
      });
  };
  const onSendOTP = (e) => {
    if (phone == null || phone === "") {
      globalContext.showToastMessage(
        true,
        "Enter valid phone number",
        "error",
        true,
        3000,
        true
      );
      return;
    }
    try {
      const singInWithPhoneMethod = setUpRecaptcha(phone);
      singInWithPhoneMethod
        .then((confirmationResult) => {
          globalContext.showToastMessage(
            true,
            "OTP sent",
            "success",
            true,
            3000,
            true
          );
          setFinalResult(confirmationResult);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      globalContext.showToastMessage(
        true,
        error.message,
        "error",
        true,
        3000,
        true
      );
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    try {
      if (loginWithEmail) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            user.getIdToken().then((idToken) => {
              api
                .post("/login", { idToken })
                .then((response) => {
                  console.log("response", response);

                  dispatch(setAccessToken(user.accessToken));
                  localStorage.setItem("isUserLoggedIn", true);
                  globalContext.setIsUserLoggedIn(true);

                  setEmail("");
                  setPassword("");
                  globalContext.setShowLoginPopup(false);

                  globalContext.showToastMessage(
                    true,
                    "Signed In Successfully !!",
                    "success",
                    true,
                    3000,
                    true
                  );

                  navigate("/");
                })
                .catch((error) => {
                  console.log("error", error);
                  dispatch(setAccessToken(null));
                  localStorage.setItem("isUserLoggedIn", false);
                  globalContext.setIsUserLoggedIn(false);

                  globalContext.showToastMessage(
                    true,
                    "Error while signing in!!",
                    "error",
                    true,
                    3000,
                    true
                  );
                });
            });
          })
          .catch((error) => {
            // Handle sign-in errors
            console.error("Sign-in error:", error);
          });
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setAccessToken(null));
      localStorage.setItem("isUserLoggedIn", false);
      globalContext.setIsUserLoggedIn(false);
    }
  };
  const hidePopup = () => {
    globalContext.setShowLoginPopup(false);
  };
  return ReactDOM.createPortal(
    <Container className={styles.loginContainer}>
      <div className={styles.crossButton}>
        <Button variant="">
          <ImCross onClick={hidePopup} />
        </Button>
      </div>
      <div className={styles.loginForm}>
        <Form onSubmit={onLogin}>
          <div
            style={{
              textAlign: "center",
              margin: "10px 0px",
              color: "#262626",
              paddingBottom: "5px",
            }}
          >
            <strong style={{ fontSize: "25px" }}>Login</strong>
          </div>
          {loginWithEmail ? (
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
          ) : (
            <Form.Group controlId="userPhone">
              <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                defaultCountry="IN"
                onChange={(value) => {
                  setPhone(value);
                }}
              />
            </Form.Group>
          )}
          {loginWithEmail ? (
            <div style={{ textAlign: "end", paddingTop: "5px" }}>
              <Button
                variant=""
                onClick={(e) => {
                  setLoginWithEmail(!loginWithEmail);
                  setShowVerificationCodeField(true);
                  setShowPasswordField(false);
                }}
              >
                Login with phone
              </Button>
            </div>
          ) : (
            <div style={{ textAlign: "end", paddingTop: "5px" }}>
              <Button
                variant=""
                onClick={(e) => {
                  onSendOTP();
                }}
              >
                Send OTP
              </Button>
              <Button
                variant=""
                onClick={(e) => {
                  setLoginWithEmail(!loginWithEmail);
                  setShowVerificationCodeField(false);
                  setShowPasswordField(true);
                }}
              >
                Login with email
              </Button>
            </div>
          )}
          <div id="recaptcha-container" />
          {showPasswordField && (
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
          )}

          {showVerificationCodeField && (
            <Form.Group className="my-3" controlId="verificationCode">
              <Form.Control
                type="number"
                placeholder="Enter otp"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </Form.Group>
          )}

          <div className={styles.buttons}>
            {loginWithEmail ? (
              <Button
                variant="primary"
                className={`px-2 py-1 ${styles.button}`}
                type="submit"
              >
                <div style={{ margin: "auto" }}>Login</div>
              </Button>
            ) : (
              <Button
                onClick={ValidateOtp}
                variant="primary"
                className={`px-2 py-1 ${styles.button}`}
              >
                <div style={{ margin: "auto" }}>Verify OTP</div>
              </Button>
            )}
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

export default Login;
