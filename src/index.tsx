import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { GlobalStyle } from './GlobalStyle';

const main = async () => {
  if (process.env.NODE_ENV === 'development') {
    if (window.location.pathname === '/react-shopping-cart-prod') {
      window.location.pathname = '/react-shopping-cart-prod/';
      return;
    }
  }

  const { worker } = require('./mocks/worker');

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart-prod/mockServiceWorker.js',
    },
  });

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  );
};

main();
