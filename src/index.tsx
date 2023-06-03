import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './components/App';
import { ResetStyle } from './styles/ResetStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductPage from './components/pages/ProductPage';
import CartPage from './components/pages/CartPage';
import EventPage from './components/pages/EventPage';
import OrderPage from './components/pages/Order/OrderPage';
import OrderDetailPage from './components/pages/Order/OrderDetailPage';
import { URL } from './abstract/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const router = createBrowserRouter(
  [
    {
      path: URL.ROOT,
      element: <App />,
      children: [
        {
          path: URL.PRODUCT,
          element: <ProductPage />,
        },
        {
          path: URL.CART,
          element: <CartPage />,
        },
        {
          path: URL.EVENT,
          element: <EventPage />,
        },
        {
          path: URL.ORDER,
          element: <OrderPage />,
        },
        {
          path: URL.ORDER_DETAIL,
          element: <OrderDetailPage />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL },
);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ResetStyle />
        <RouterProvider router={router} />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
