import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from 'pages/ProductListPage';
import ROUTE_PATH from 'constants/routePath';
import Layout from 'components/Layout/Layout';
import ShoppingCartPage from 'pages/ShoppingCartPage';
import { Suspense } from 'react';
import OrderSheetPage from 'pages/OrderSheetPage';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.root,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: ROUTE_PATH.cart,
        element: (
          <Suspense fallback={<div>장바구니 페이지 로딩중...</div>}>
            <ShoppingCartPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATH.orderSheet,
        element: (
          <Suspense fallback={<div>주문서 페이지 로딩중...</div>}>
            <OrderSheetPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
