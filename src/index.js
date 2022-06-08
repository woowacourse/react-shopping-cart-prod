import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from 'reportWebVitals';
import App from 'App';
import store from 'store';

// 이프
const SERVER_URL1 = 'http://ec2-3-39-234-109.ap-northeast-2.compute.amazonaws.com:8080/';

// 더즈
const SERVER_URL2 = 'http://15.164.211.129:8080/';

// 토르
const SERVER_URL3 = 'http://ec2-15-164-232-166.ap-northeast-2.compute.amazonaws.com:8080/';

// 찬
const SERVER_URL4 = 'http://ec2-3-34-130-116.ap-northeast-2.compute.amazonaws.com:8080/';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3000';
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = SERVER_URL1;
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
