import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import CartListPage from '../pages/CartListPage';
import CouponIssuePage from '../pages/CouponIssuePage';
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
      path: '/coupon',
      element: <CouponIssuePage />,
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
