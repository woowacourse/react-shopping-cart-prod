import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';

import App from './App';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');

  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
