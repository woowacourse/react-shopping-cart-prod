import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { PATH } from '../constants/path';
import CartPage from '../pages/CartPage/CartPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import OrderPage from '../pages/OrderPage/OrderPage';
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
          path: PATH.ORDERS,
          element: <OrderPage />,
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
