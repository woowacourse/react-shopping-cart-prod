import orderList from './orderList.reducer';
import shoppingCart from './shoppingCart.reducer';
import userInfo from './userInfo.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  shoppingCart,
  orderList,
  userInfo,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['userInfo'],
};

export default persistReducer(persistConfig, rootReducer);
