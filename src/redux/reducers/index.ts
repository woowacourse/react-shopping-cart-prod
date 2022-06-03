import { combineReducers } from 'redux';
import { itemListReducer } from './itemListReducer';
import { cartListReducer } from './cartListReducer';
import { snackbarReducer } from './snackbarReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  itemListReducer,
  cartListReducer,
  userReducer,
  snackbarReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
