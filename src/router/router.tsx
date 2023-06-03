import { createBrowserRouter } from 'react-router-dom';
import Cart from '@pages/Cart';
import Home from '@pages/Home';
import Orders from '@pages/Orders';
import OrderComplete from '@pages/Orders/OrderComplete';
import OrderDetail from '@pages/Orders/OrderDetail';

export const ROUTER_PATH = {
  HOME: '/',
  CART: '/cart',
  ORDERS: '/orders',
};

export const ORDER_PATH = {
  COMPLETE: `${ROUTER_PATH.ORDERS}/complete`,
};

const router = createBrowserRouter(
  [
    {
      path: ROUTER_PATH.HOME,
      element: <Home />,
    },
    {
      path: ROUTER_PATH.CART,
      element: <Cart />,
    },
    {
      path: ROUTER_PATH.ORDERS,
      element: <Orders />,
    },
    {
      path: `${ROUTER_PATH.ORDERS}/:orderId`,
      element: <OrderDetail />,
    },
    {
      path: ORDER_PATH.COMPLETE,
      element: <OrderComplete />,
    },
  ],
  { basename: '/react-shopping-cart-prod' }
);

export default router;
