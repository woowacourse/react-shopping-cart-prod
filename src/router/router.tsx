import { createBrowserRouter } from 'react-router-dom';
import Cart from '@pages/Cart';
import Home from '@pages/Home';
import Orders from '@pages/Orders';

export const ROUTER_PATH = {
  home: '/',
  cart: '/cart',
  orders: '/orders',
};

const router = createBrowserRouter(
  [
    {
      path: ROUTER_PATH.home,
      element: <Home />,
    },
    {
      path: ROUTER_PATH.cart,
      element: <Cart />,
    },
    {
      path: ROUTER_PATH.orders,
      element: <Orders />,
    },
  ],
  { basename: '/react-shopping-cart-prod' }
);

export default router;
