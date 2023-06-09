import { createBrowserRouter } from 'react-router-dom';
import { BASE_URL } from './config/environment';
import CartPage from './pages/CartPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderDonePage from './pages/OrderDonePage';
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
          path: 'login',
          element: <LoginPage />,
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
              children: [
                {
                  path: '',
                  element: <OrderDetailPage />,
                },
                {
                  path: 'done',
                  element: <OrderDonePage />,
                },
              ],
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
