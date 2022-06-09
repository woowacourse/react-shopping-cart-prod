import auth from './auth.reducer';
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
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['userInfo', 'snackBar'],
};

export default persistReducer(persistConfig, rootReducer);
