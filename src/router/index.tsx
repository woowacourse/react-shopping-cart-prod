import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import NotFound from "../pages/NotFound";
import Order from "../pages/Order";
import OrderDetail from "../pages/OrderDetail";
import OrderHistory from "../pages/OrderHistory";

export const ROUTER_PATH = {
  Main: "/",
  Login: "/Login",
  Cart: "/Cart",
  MyPage: "/MyPage",
  Order: "/Cart/Order",
  OrderHistory: "/OrderHistory",
  OrderDetail: "/OrderHistory/Detail",
  NotFound: "/*",
};

export const PageRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: ROUTER_PATH.Main,
      element: <Main />,
    },
    {
      path: ROUTER_PATH.Login,
      element: <Login />,
    },
    {
      path: ROUTER_PATH.Cart,
      element: <Cart />,
    },
    {
      path: ROUTER_PATH.MyPage,
      element: <MyPage />,
    },
    {
      path: ROUTER_PATH.Order,
      element: <Order />,
    },
    {
      path: ROUTER_PATH.OrderHistory,
      element: <OrderHistory />,
    },
    {
      path: ROUTER_PATH.OrderDetail + "/:orderId",
      element: <OrderDetail />,
    },
    { path: ROUTER_PATH.NotFound, element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
};
