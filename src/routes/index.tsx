import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import OrderListPage from '../pages/OrderListPage';
import OrderDetailPage from '../pages/OrderDetailPage';
import { PATH } from '../store/path';

const ROUTER = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: PATH.PRODUCT_PAGE,
          element: <ProductPage />,
        },
        {
          path: PATH.CART_PAGE,
          element: <CartPage />,
        },
        {
          path: PATH.ORDER_LIST_PAGE,
          element: <OrderListPage />,
        },
        {
          path: `${PATH.ORDER_LIST_PAGE}${PATH.ORDER_DETAIL_PAGE}/:id`,
          element: <OrderDetailPage />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default ROUTER;
