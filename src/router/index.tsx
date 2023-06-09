import { createBrowserRouter } from 'react-router-dom';
import ProductList from 'pages/ProductList';
import CartList from 'pages/CartList';
import NotFound from 'pages/NotFound';
import OrderDetail from 'pages/OrderDetail';
import OrderList from 'pages/OrderList';
import Root from './Root';
import { ROUTES } from 'constants/index';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: `${ROUTES.PRODUCT_LIST}`,
          element: <ProductList />,
        },
        {
          path: `${ROUTES.CART_LIST}`,
          element: <CartList />,
        },
        {
          path: `${ROUTES.ORDER_LIST}`,
          element: <OrderList />,
        },
        {
          path: `${ROUTES.ORDER_LIST}/:orderId`,
          element: <OrderDetail />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
