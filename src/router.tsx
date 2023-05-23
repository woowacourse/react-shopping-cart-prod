import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/", element: <Home />
        },
        {
          path: "/cart", element: <Cart />
        },
        {
          path: "/order", element: <Order />
        },
        {
          path: "/order/:orderId", element: <OrderDetail />
        },
      ],
    },
  ],
  {
    basename: "/react-shopping-cart-prod/",
  }
);

export default router;
