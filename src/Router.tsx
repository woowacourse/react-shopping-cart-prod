import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from 'pages/ProductListPage';
import ROUTE_PATH from 'constants/routePath';
import Layout from 'components/Layout/Layout';
import ShoppingCartPage from 'pages/ShoppingCartPage';
import OrderSheetPage from 'pages/OrderSheetPage';
import OrderListPage from 'pages/OrderListPage';
import OrderDetailPage from 'pages/OrderDetailPage';
import { ErrorBoundary } from 'ErrorBoundary';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.root,
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: ROUTE_PATH.cart,
        element: <ShoppingCartPage />,
      },
      {
        path: ROUTE_PATH.orderSheet,
        element: <OrderSheetPage />,
      },
      {
        path: ROUTE_PATH.orderList,
        element: <OrderListPage />,
      },
      {
        path: ROUTE_PATH.orderDetail,
        element: <OrderDetailPage />,
      },
    ],
  },
]);

export default router;
