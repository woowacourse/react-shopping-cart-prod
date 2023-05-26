import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Cart from "../pages/Cart";
import Main from "../pages/Main";

export const ROUTER_PATH = {
  Main: "/react-shopping-cart-prod",
  Cart: "/react-shopping-cart-prod/Cart",
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
      path: ROUTER_PATH.NotFound,
      element: <Main />,
    },
  ]);
  return <RouterProvider router={router} />;
};
