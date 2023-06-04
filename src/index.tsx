import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './GlobalStyle';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPages';
import CouponPage from './pages/CouponPage';
import { worker } from './mocks/browser';
import OrderCompletePage from './pages/OrderCompletePage';

worker.start({
  serviceWorker: {
    url: '/mockServiceWorker.js',
  },
});

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <ProductListPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'coupons',
        element: <CouponPage />,
      },
      {
        path: 'order-complete',
        element: <OrderCompletePage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>
);
