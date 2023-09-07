import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./layout/Main";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import RootLayout from "./layout/RootLayout";
import Login from "./features/user/Login";
import Register from "./features/user/Register";
import Cart from "./features/cart/Cart";
import { useEffect } from "react";
import { setAccessToken, setIsUserLoggedIn } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAccessToken(user.accessToken));
        dispatch(setIsUserLoggedIn(true));
      } else {
        dispatch(setAccessToken(null));
        dispatch(setIsUserLoggedIn(false));
      }
    });
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route to="/" element={<RootLayout />}>
        <Route index element={<Main />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="cart" element={<Cart />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
