import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProductList from 'pages/ProductList';
import CartList from 'pages/CartList';
import NotFound from 'pages/NotFound';
import OrderedList from 'pages/OrderedList';
import { ROUTES } from 'utils/constants';
import OrderDetail from 'pages/OrderDetail';

const router = createBrowserRouter(
  [
    {
      path: ROUTES.PRODUCT_LIST,
      element: (
        <Suspense>
          <ProductList />
        </Suspense>
      ),
    },
    {
      path: ROUTES.CART_LIST,
      element: (
        <Suspense>
          <CartList />
        </Suspense>
      ),
    },
    {
      path: ROUTES.ORDERED_LIST,
      element: (
        <Suspense>
          <OrderedList />
        </Suspense>
      ),
    },
    {
      path: `${ROUTES.ORDERED_DETAIL}/:id`,
      element: (
        <Suspense>
          <OrderDetail />
        </Suspense>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
