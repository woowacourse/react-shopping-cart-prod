import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Cart from "../pages/Cart";
import Main from "../pages/Main";

export const ROUTER_PATH = {
  Main: "/",
  Cart: "/Cart",
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
  ]);
  return <RouterProvider router={router} />;
};
