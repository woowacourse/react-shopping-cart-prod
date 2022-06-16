import { combineReducers } from 'redux';
import { cartReducer, authReducer, snackbarReducer } from 'reducers';

const rootReducer = combineReducers({
  cartReducer,
  authReducer,
  snackbarReducer,
});

export default rootReducer;
