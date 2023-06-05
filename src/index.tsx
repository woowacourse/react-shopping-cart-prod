import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import './index.css';
// import { worker } from './mocks/browser';
import AppRouter from './router/AppRouter';

// worker.start();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppRouter />
    </QueryClientProvider>
  </RecoilRoot>
);

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

// main();
