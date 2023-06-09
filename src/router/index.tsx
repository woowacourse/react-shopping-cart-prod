import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from 'pages/ProductListPage';
import CartPage from 'pages/CartPage';
import NotFound from 'pages/NotFound';
import OrderListPage from 'pages/OrderListPage';
import { ROUTES } from 'utils/constants';
import OrderDetailPage from 'pages/OrderDetailPage';

const router = createBrowserRouter(
  [
    {
      path: ROUTES.PRODUCT_LIST,
      element: (
        <Suspense>
          <ProductListPage />
        </Suspense>
      ),
    },
    {
      path: ROUTES.CART_LIST,
      element: (
        <Suspense>
          <CartPage />
        </Suspense>
      ),
    },
    {
      path: ROUTES.ORDERED_LIST,
      element: (
        <Suspense>
          <OrderListPage />
        </Suspense>
      ),
    },
    {
      path: `${ROUTES.ORDERED_DETAIL}/:id`,
      element: (
        <Suspense>
          <OrderDetailPage />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
