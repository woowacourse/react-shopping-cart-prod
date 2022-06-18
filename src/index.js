import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import App from './App';
import 'fonts.css';

import selectedItemReducer from 'store/modules/selectedItem';
import productListReducer from 'store/modules/productList';
import cartReducer from 'store/modules/cart';
import authReducer from 'store/modules/auth';

import {SmingModalProvider} from 'sming-payments';

export const rootReducer = combineReducers({
  productListReducer,
  cartReducer,
  selectedItemReducer,
  authReducer,
});

export const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SmingModalProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SmingModalProvider>,
);
