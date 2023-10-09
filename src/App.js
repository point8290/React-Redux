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
import ProductList from "./features/product/ProductList";
import Order from "./features/order/Order";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route to="/" element={<RootLayout />}>
        <Route index element={<Main />}></Route>
        <Route path="/products/:category" element={<ProductList />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order" element={<Order />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
