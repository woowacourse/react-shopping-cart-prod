import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import GlobalStyle from './GlobalStyle';
import ProductPage from './components/pages/ProductPage/ProductPage';
import CartPage from './components/pages/CartPage/CartPage';
import ToastList from './components/common/Toast/ToastList';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import OrderCompletePage from './components/pages/OrderCompletePage/OrderCompletePage';
import OrderPage from './components/pages/OrderPage/OrderPage';
import OrderDetailPage from './components/pages/OrderDetailPage/OrderDetailPage';
import ErrorComponent from './components/common/Error/ErrorComponent';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <ProductPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'orders/:orderId',
        element: <OrderCompletePage />,
      },
      {
        path: 'order-history',
        element: <OrderPage />,
      },
      {
        path: 'order-history/:orderId',
        element: <OrderDetailPage />,
      },
      {
        path: '*',
        element: (
          <ErrorComponent>
            요청하신 페이지를 찾지 못했습니다. 주소가 올바른지 다시 한 번 확인해
            주시겠어요?
          </ErrorComponent>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <Suspense>
        <RouterProvider router={router} />
        <ToastList />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
