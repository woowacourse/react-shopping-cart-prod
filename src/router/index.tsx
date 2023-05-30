import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Cart from "../pages/Cart";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";
import Order from "../pages/Order";
import { OrderDetail } from "../components";

export const ROUTER_PATH = {
  Main: "/react-shopping-cart-prod",
  Cart: "/react-shopping-cart-prod/Cart",
  Order: "/react-shopping-cart-pord/Order",
  OrderDetail: "/react-shopping-cart-pord/OrderDetail",
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
      path: ROUTER_PATH.Order,
      element: <Order />,
    },
    {
      path: ROUTER_PATH.OrderDetail,
      element: <OrderDetail />,
    },
    {
      path: ROUTER_PATH.NotFound,
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};
