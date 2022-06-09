import App from 'App';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import rootReducer from 'redux/reducers';

import { BASE_URL } from 'constants/api';

const store = createStore(rootReducer);
const persistor = persistStore(store);

axios.defaults.baseURL = BASE_URL;

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
