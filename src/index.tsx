import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import App from './App';
import { worker } from './mocks/browsers';

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
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

main();
