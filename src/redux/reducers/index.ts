import cart from './cart';
import product from './product';
import user from './user';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  product,
  cart,
  user,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
