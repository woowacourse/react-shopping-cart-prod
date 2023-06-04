import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import CartListPage from '../pages/CartListPage';
import CouponIssuePage from '../pages/CouponIssuePage';
import OrderDetailPage from '../pages/OrderDetailPage';
import OrderListPage from '../pages/OrderListPage';
import ProductListPageContainer from '../pages/ProductListPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProductListPageContainer />,
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
      path: '/orders',
      element: <OrderListPage />,
    },
    {
      path: '/orders/:id',
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
