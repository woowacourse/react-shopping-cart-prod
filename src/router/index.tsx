import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProductList from 'pages/ProductList';
import CartList from 'pages/CartList';
import NotFound from 'pages/NotFound';

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
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
