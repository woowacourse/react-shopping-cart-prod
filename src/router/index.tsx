import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProductList from 'pages/ProductList';
import CartList from 'pages/CartList';
import NotFound from 'pages/NotFound';
import Order from 'pages/Order';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Suspense>
          <ProductList />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: '/cart',
      element: (
        <Suspense>
          <CartList />
        </Suspense>
      ),
      errorElement: <NotFound />,
    },
    {
      path: '/order',
      element: <Order />,
      errorElement: <NotFound />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
