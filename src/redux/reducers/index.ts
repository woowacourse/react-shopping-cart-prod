import cart from './cart';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import product from './product';
import storage from 'redux-persist/lib/storage';
import user from './user';
import snackBar from './snackBar';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'],
  blacklist: ['snackBar'],
};

const rootReducer = combineReducers({
  product,
  cart,
  user,
  snackBar,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
