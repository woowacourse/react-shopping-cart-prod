import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from 'pages/ProductListPage';
import ROUTE_PATH from 'constants/routePath';
import Layout from 'components/Layout/Layout';
import ShoppingCartPage from 'pages/ShoppingCartPage';
import { Suspense } from 'react';
import CheckOutPage from 'pages/CheckOutPage';
import OrderListPage from 'pages/OrderListPage';
import OrderDetailPage from 'pages/OrderDetailPage';

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
        path: ROUTE_PATH.CHECKOUT,
        element: <CheckOutPage />,
      },
      {
        path: ROUTE_PATH.ORDER_LIST,
        element: <OrderListPage />,
      },
      {
        path: `${ROUTE_PATH.ORDER_LIST}/:orderId`,
        element: <OrderDetailPage />,
      },
    ],
  },
]);

export default router;
