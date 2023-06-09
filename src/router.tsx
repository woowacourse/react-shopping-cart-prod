import { createBrowserRouter } from 'react-router-dom';
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
          path: 'order-list',
          element: <OrderListPage />,
        },
        {
          path: 'order-detail/:orderId',
          element: <OrderDetailPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export default router;
