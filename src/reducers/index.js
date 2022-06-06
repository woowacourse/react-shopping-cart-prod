import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import snackbar from './snackbar';
import products from './products';
import product from './product';
import user from './user';
import cart from './cart';
import spinner from './spinner';

const persistConfig = {
  key: 'user',
  storage,
};

export const rootReducer = combineReducers({ products, product, user, cart, snackbar, spinner });

export default persistReducer(persistConfig, rootReducer);
