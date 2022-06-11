import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from 'reportWebVitals';
import App from 'App';
import store from 'store';
import { URL } from 'utils/constants';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = URL.DEV_SERVER;

  const { worker } = require('./mocks/worker');

  worker.start({
    serviceWorker: {
      url: `/mockServiceWorker.js`,
    },
  });
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = URL.이프_서버;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
