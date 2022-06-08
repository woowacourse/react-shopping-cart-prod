import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { store } from 'store/store';

import { GlobalStyle } from 'styles/GlobalStyles';
import Theme from 'styles/Theme';

// if (process.env.NODE_ENV === 'development') {
//   if (window.location.pathname === '/react-shopping-cart') {
//     window.location.pathname = '/react-shopping-cart/';
//   }

//   const { worker } = require('./mocks/browser');
//   worker.start({
//     serviceWorker: {
//       url: '/react-shopping-cart/mockServiceWorker.js',
//     },
//     onUnhandledRequest(req) {
//       if (!req.url.pathname.startsWith('/react-shopping-cart/')) {
//         console.warn('Found an unhandled %s request to %s', req.method, req.url.href);
//       }
//     },
//     quiet: true,
//   });
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <BrowserRouter basename="/react-shopping-cart">
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
