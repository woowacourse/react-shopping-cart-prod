import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './components/App';
import { ResetStyle } from './styles/ResetStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { worker } from './mocks/browsers';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

worker.start();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ResetStyle />
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
