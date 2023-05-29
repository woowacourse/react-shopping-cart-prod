import { createBrowserRouter } from 'react-router-dom';

import CartList from '@Pages/CartList';
import Home from '@Pages/Home';
import NotFound from '@Pages/NotFound';
import OrderList from '@Pages/OrderList';

import App from './App';

const router = createBrowserRouter(
  [
    {
      element: <App />,
      errorElement: <NotFound error={new Error('페이지가 존재하지 않거나 삭제되어 찾을 수 없어요.')} />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/cart-list',
          element: <CartList />,
        },
        {
          path: '/order-list',
          element: <OrderList />,
        },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart-prod',
  },
);

export default router;
