import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./layout/Main";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Cart from "./features/cart/Cart";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route to="/" element={<RootLayout />}>
        <Route index element={<Main />}></Route>
        <Route path="cart" element={<Cart />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
