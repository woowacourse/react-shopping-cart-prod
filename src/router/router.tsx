import { createBrowserRouter } from 'react-router-dom';
import ROUTER_PATH from './constants/routerPath';
import { HomeLayout } from '@layout/HomeLayout';
import { HomePage } from '@pages/HomePage';
import { CartPage } from '@pages/CartPage';

const router = createBrowserRouter(
  [
    {
      path: ROUTER_PATH.home,
      element: <HomeLayout />,
      children: [
        { path: ROUTER_PATH.home, element: <HomePage /> },
        { path: ROUTER_PATH.cart, element: <CartPage /> },
      ],
    },
  ],
  {
    basename: ROUTER_PATH.baseName,
  }
);

export default router;
