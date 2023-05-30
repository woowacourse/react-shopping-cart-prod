import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProductList from 'pages/ProductList';
import CartList from 'pages/CartList';
import NotFound from 'pages/NotFound';
import PaymentList from 'pages/PaymentList';
import { ROUTES } from 'utils/constants';

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
      path: ROUTES.PAYMENT_LIST,
      element: (
        <Suspense>
          <PaymentList />
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
