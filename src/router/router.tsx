import { createBrowserRouter } from 'react-router-dom';
import ROUTER_PATH from './constants/routerPath';
import { HomeLayout } from '@layout/HomeLayout';
import { HomePage } from '@pages/HomePage';
import { CartPage } from '@pages/CartPage';
import { OrderPage } from '@pages/OrderPage';

const router = createBrowserRouter(
  [
    {
      path: ROUTER_PATH.home,
      element: <HomeLayout />,
      children: [
        { path: ROUTER_PATH.home, element: <HomePage /> },
        { path: ROUTER_PATH.cart, element: <CartPage /> },
        { path: ROUTER_PATH.order, element: <OrderPage /> },
      ],
    },
  ],
  {
    basename: ROUTER_PATH.baseName,
  }
);

export default router;
