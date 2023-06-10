import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import './index.css';
import { worker } from './mocks/browser';
import AppRouter from './router/AppRouter';

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
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </RecoilRoot>
);
main();
