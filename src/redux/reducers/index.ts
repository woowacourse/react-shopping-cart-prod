import { combineReducers } from 'redux';
import { itemListReducer } from './itemListReducer';
import { cartListReducer } from './cartListReducer';
import { userReducer } from './userReducer';
import { snackBarReducer } from './snackBarReducer';

const rootReducer = combineReducers({
  itemListReducer,
  cartListReducer,
  userReducer,
  snackBarReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
