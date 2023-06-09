import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Order from "./pages/Order";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/order",
          element: <Orders />,
        },
        {
          path: "/order/:orderId",
          element: <Order />,
        },
      ],
    },
  ],
  {
    basename: "/react-shopping-cart-prod/",
  }
);

export default router;
