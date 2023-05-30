import { createBrowserRouter } from 'react-router-dom';
import { BASE_URL } from './config/environment';
import CartPage from './pages/CartPage';
import ErrorPage from './pages/ErrorPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderListPage from './pages/OrderListPage';
import ProductListPage from './pages/ProductListPage';
import RootPage from './pages/RootPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <ProductListPage />,
        },
        {
          path: 'cart',
          element: <CartPage />,
        },
        {
          path: 'orders',
          children: [
            {
              path: '',
              element: <OrderListPage />,
            },
            {
              path: ':orderId',
              element: <OrderDetailPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: BASE_URL,
  },
);

export default router;
