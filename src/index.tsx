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

// const main = async () => {
//   if (window.location.pathname === '/react-shopping-cart-prod') {
//     window.location.pathname = '/react-shopping-cart-prod/';
//     return;
//   }

//   await worker.start({
//     serviceWorker: {
//       url: '/react-shopping-cart-prod/mockServiceWorker.js',
//     },
//   });
// };

// if (process.env.NODE_ENV === 'development') {
//   worker.start();
// } else {
//   main();
// }

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
