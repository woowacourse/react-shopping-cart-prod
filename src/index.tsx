import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import GlobalStyle from './styles/GlobalStyle';
import OrderListPage from './pages/OrderListPage';
import OrderDetailPage from './pages/OrderDetailPage';
import { PATH } from './store/path';

const router = createBrowserRouter(
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
