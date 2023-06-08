import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './GlobalStyle';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';
import { worker } from './mocks/browser';
import OrderPage from './pages/OrderPage';
import {
  CART_PAGE_PATH_NAME,
  LANDING_PAGE_PATH_NAME,
  ORDER_PAGE_PATH_NAME,
} from './constant/route';

const main = async () => {
  if (window.location.pathname === '/react-shopping-cart-prod') {
    window.location.pathname = '/react-shopping-cart-prod/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart-prod/mockServiceWorker.js',
    },
  });
};

if (process.env.NODE_ENV === 'development') {
  worker.start();
} else {
  main();
}

const router = createHashRouter([
  {
    path: LANDING_PAGE_PATH_NAME,
    element: <App />,
    children: [
      {
        path: '',
        element: <ProductListPage />,
      },
      {
        path: CART_PAGE_PATH_NAME,
        element: <CartPage />,
      },
      {
        path: ORDER_PAGE_PATH_NAME,
        element: <OrderPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <>
    <GlobalStyle />
    <RecoilRoot>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  </>,
);
