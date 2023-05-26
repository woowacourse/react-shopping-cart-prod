import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './GlobalStyle';

const main = async () => {
  if (window.location.pathname === '/react-shopping-shop') {
    window.location.pathname = '/react-shopping-shop/';
    return;
  }

  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>,
  );
};

main();
