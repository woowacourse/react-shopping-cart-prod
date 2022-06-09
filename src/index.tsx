import App from 'App';
import worker from 'mocks/browser';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';

import rootReducer from 'redux/reducers';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware, ReduxThunk))
);

// if (process.env.NODE_ENV === 'development') {
// worker.start().catch((err) => console.error(err));
// }

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
