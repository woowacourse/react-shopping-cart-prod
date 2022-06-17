import auth from './auth.reducer';
import error from './errors.reducer';
import orderList from './orderList.reducer';
import snackBar from './snackbar.reducer';
import userInfo from './userInfo.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  orderList,
  userInfo,
  auth,
  snackBar,
  error,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['userInfo', 'snackBar', 'error'],
};

export default persistReducer(persistConfig, rootReducer);
