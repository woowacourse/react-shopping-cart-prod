import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from 'reportWebVitals';
import axios from 'axios';
import App from 'App';
import store from 'store/store';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3000';
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://ec2-13-125-41-7.ap-northeast-2.compute.amazonaws.com:8080/';
}

async function main() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/worker');

    if (window.location.pathname === '/react-shopping-cart-prod') {
      window.location.pathname = '/react-shopping-cart-prod/';
      return;
    }

    await worker.start({
      serviceWorker: {
        url: `/react-shopping-cart-prod/mockServiceWorker.js`,
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
