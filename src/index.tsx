import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './GlobalStyle';
import { worker } from './mocks/browsers';

const main = async () => {
  if (window.location.pathname === '/react-shopping-shop') {
    window.location.pathname = '/react-shopping-shop/';
    return;
  }

  // await worker.start({
  //   serviceWorker: {
  //     url: '/react-shopping-shop/mockServiceWorker.js',
  //   },
  // });

  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>,
  );
};

main();
