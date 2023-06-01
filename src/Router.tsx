import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from 'pages/ProductListPage';
import ROUTE_PATH from 'constants/routePath';
import Layout from 'components/Layout/Layout';
import ShoppingCartPage from 'pages/ShoppingCartPage';
import { Suspense } from 'react';
import OrderPage from 'pages/OrderPage';
import OrderListPage from 'pages/OrderListPage';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.ROOT,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: ROUTE_PATH.CART,
        element: (
          <Suspense fallback={<div>장바구니 페이지 로딩중...</div>}>
            <ShoppingCartPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATH.ORDER,
        element: <OrderPage />,
      },
      {
        path: ROUTE_PATH.ORDER_LIST,
        element: <OrderListPage />,
      },
    ],
  },
]);

export default router;
