import { createBrowserRouter } from 'react-router-dom';
import Cart from '@pages/Cart';
import Home from '@pages/Home';
import HomeLayout from '@components/layout/HomeLayout';

export const ROUTER_PATH = {
  home: '/',
  cart: '/cart',
};

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
  { basename: `${process.env.PUBLIC_URL}` }
);

export default router;
