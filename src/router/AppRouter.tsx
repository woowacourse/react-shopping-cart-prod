import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import CartListPage from '../pages/CartListPage';
import OrderDetailPage from '../pages/OrderDetailPage';
import OrderListPage from '../pages/OrderListPage';
import ProductListPage from '../pages/ProductListPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProductListPage />,
    },
    {
      path: '/cartList',
      element: <CartListPage />,
    },
    {
      path: '/orderList',
      element: <OrderListPage />,
    },
    {
      path: '/orderList/:id',
      element: <OrderDetailPage />,
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
