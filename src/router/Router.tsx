import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import MainPage from '../pages/MainPage';
import CartPage from '../pages/CartPage';
import Root from './Root';
import OrderListPage from '../pages/OrderListPage';
import OrderListDetailPage from '../pages/OrderListDetailPage';
import MemberPage from '../pages/MemberPage';

const Router = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <MainPage /> },
          { path: 'cart', element: <CartPage /> },
          { path: 'member', element: <MemberPage /> },
          { path: 'order-list', element: <OrderListPage /> },
          { path: 'order-list/:orderId', element: <OrderListDetailPage /> },
        ],
      },
    ],
    { basename: process.env.PUBLIC_URL },
  );

  return <RouterProvider router={router} />;
};

export default Router;
