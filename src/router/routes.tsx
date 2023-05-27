import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { PATH } from '../constants/path';
import CartPage from '../pages/CartPage/CartPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderDetailPage from '../pages/OrderDetailPage/OrderDetailPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import OrderSuccessPage from '../pages/OrderSuccessPage/OrderSuccessPage';
import ProductListPage from '../pages/ProductListPage/ProductListPage';

const router = createBrowserRouter(
  [
    {
      path: PATH.ROOT,
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '',
          element: <ProductListPage />,
        },
        {
          path: PATH.CARTS,
          element: <CartPage />,
        },
        {
          path: PATH.ORDER,
          element: <OrderPage />,
        },
        {
          path: PATH.ORDER_DETAIL,
          element: <OrderDetailPage />,
        },
        {
          path: PATH.ORDER_SUCCESS,
          element: <OrderSuccessPage />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
