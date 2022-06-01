import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from 'reportWebVitals';
import App from 'App';
import store from 'store/store';
import axios from 'axios';
import { SERVER_URL } from 'utils/constants';

axios.defaults.baseURL = SERVER_URL;

async function main() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/worker');

    if (window.location.pathname === '/react-shopping-cart') {
      window.location.pathname = '/react-shopping-cart/';
      return;
    }

    await worker.start({
      serviceWorker: {
        url: `/react-shopping-cart/mockServiceWorker.js`,
      },
    });
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
  );
}

main();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
