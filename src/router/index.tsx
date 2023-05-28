import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";

export const ROUTER_PATH = {
  Main: "/",
  Cart: "/Cart",
  Login: "/Login",
  NotFound: "/*",
};

export const PageRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: ROUTER_PATH.Main,
      element: <Main />,
    },
    {
      path: ROUTER_PATH.Cart,
      element: <Cart />,
    },
    {
      path: ROUTER_PATH.Login,
      element: <Login />,
    },
    { path: ROUTER_PATH.NotFound, element: <NotFound /> },
  ]);
  return <RouterProvider router={router} />;
};
