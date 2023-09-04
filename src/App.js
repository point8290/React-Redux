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
import Login from "./features/user/Login";
import Register from "./features/user/Register";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route to="/" element={<RootLayout />}>
        <Route index element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
