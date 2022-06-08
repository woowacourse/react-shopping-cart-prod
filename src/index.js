import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from 'reportWebVitals';

import App from 'App';
import store from 'store';
import { ENV } from 'utils/constants';
import { isApiTest } from 'apis/apiClient';
// if (process.env.NODE_ENV === ENV.DEVELOPMENT) {

if (!isApiTest) {
  const { worker } = require('./mocks/worker');
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
