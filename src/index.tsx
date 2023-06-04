import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from './App';

import { worker } from './mocks/browser';
import GlobalStyle from './styles';
import theme from './styles/theme';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import NotFoundPage from './pages/NotFoundPage';

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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary fallback={<NotFoundPage />}>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

main();
