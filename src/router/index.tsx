import { createBrowserRouter } from 'react-router-dom';
import ProductList from 'pages/ProductList';
import CartList from 'pages/CartList';
import NotFound from 'pages/NotFound';
import OrderDetail from 'pages/OrderDetail';
import OrderList from 'pages/OrderList';
import Root from './Root';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <ProductList />,
        },
        {
          path: '/cart',
          element: <CartList />,
        },
        {
          path: '/order',
          element: <OrderList />,
        },
        {
          path: '/order/:orderId',
          element: <OrderDetail />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
