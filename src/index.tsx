import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import { GlobalStyle } from './GlobalStyle';
import { worker } from './mock/browser';

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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

main();
