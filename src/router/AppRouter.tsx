import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  CART_PAGE_LOCATE,
  COUPON_LIST_PAGE_LOCATE,
  MAIN_PAGE_LOCATE,
  ORDER_INFORMATION_PAGE_LOCATE,
  ORDER_LIST_PAGE_LOCATE,
  ORDER_SUCCESS_PAGE,
} from '../constants';
import CartListPage from '../pages/CartListPage';
import CouponListPage from '../pages/CouponListPage';
import OrderInformationPage from '../pages/OrderInformationPage';
import OrderListPage from '../pages/OrderListPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import ProductListPage from '../pages/ProductListPage';

const router = createBrowserRouter(
  [
    {
      path: MAIN_PAGE_LOCATE,
      element: <ProductListPage />,
    },
    {
      path: CART_PAGE_LOCATE,
      element: <CartListPage />,
    },
    {
      path: ORDER_LIST_PAGE_LOCATE,
      element: <OrderListPage />,
    },
    {
      path: ORDER_INFORMATION_PAGE_LOCATE,
      element: <OrderInformationPage />,
    },
    {
      path: COUPON_LIST_PAGE_LOCATE,
      element: <CouponListPage />,
    },
    {
      path: ORDER_SUCCESS_PAGE,
      element: <OrderSuccessPage />,
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
