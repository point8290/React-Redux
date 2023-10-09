import api from "../../api/user";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../../firebase";
export const loginWithGoogle = (callback) => {
  try {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const firebaseUser = {
          email: user.email,
          name: user.displayName,
          uid: user.uid,
          phone: user.phoneNumber,
        };
        api
          .post("/google", { firebaseUser })
          .then((response) => {
            callback({ token, user: response.data.user });
          })
          .catch((error) => {
            callback();
            console.log("error", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        callback();
      });
  } catch (error) {
    console.log("error", error);
    callback();
  }
};
