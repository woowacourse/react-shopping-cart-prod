import React from 'react';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import theme from './styles/theme';
import GlobalStyle from './styles';

import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import ProductsListPage from './pages/ProductsListPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import OrderBoxListPage from './pages/OrderBoxListPage';
import OrderDetailPage from './pages/OrderDetailPage';

import { worker } from './mocks/browser';

const main = async () => {
  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart-prod/mockServiceWorker.js',
    },
  });
};

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        { path: '', element: <ProductsListPage /> },
        { path: 'cart', element: <CartPage /> },
        {
          path: 'order',
          element: <OrderPage />,
          children: [
            { path: '', element: <OrderBoxListPage /> },
            { path: 'detail/:id', element: <OrderDetailPage /> },
          ],
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

main();
