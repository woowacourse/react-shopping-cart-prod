import { createBrowserRouter } from 'react-router-dom';
import Cart from '@pages/Cart';
import Home from '@pages/Home';
import Orders from '@pages/Orders';
import Layout from '@components/layout/Layout';

export const ROUTER_PATH = {
  home: '/',
  cart: '/cart',
  orders: '/orders',
};

const router = createBrowserRouter(
  [
    {
      path: ROUTER_PATH.home,
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: ROUTER_PATH.cart,
      element: (
        <Layout>
          <Cart />
        </Layout>
      ),
    },
    {
      path: ROUTER_PATH.orders,
      element: (
        <Layout>
          <Orders />
        </Layout>
      ),
    },
  ],
  { basename: '/react-shopping-cart-prod' }
);

export default router;
