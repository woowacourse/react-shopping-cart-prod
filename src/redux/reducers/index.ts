import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cart from './cart';
import product from './product';
import user from './user';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  product,
  cart,
  user,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
