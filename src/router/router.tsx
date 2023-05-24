import { createBrowserRouter } from 'react-router-dom';
import ROUTER_PATH from './constants/routerPath';
import { HomeLayout } from '@layout/HomeLayout';
import { Home } from '@pages/Home';
import { Cart } from '@pages/Cart';

const router = createBrowserRouter(
  [
    {
      path: ROUTER_PATH.home,
      element: <HomeLayout />,
      children: [
        { path: ROUTER_PATH.home, element: <Home /> },
        { path: ROUTER_PATH.cart, element: <Cart /> },
      ],
    },
  ],
  {
    basename: ROUTER_PATH.baseName,
  }
);

export default router;
