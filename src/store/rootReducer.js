import { combineReducers } from 'redux';

import authReducer from 'modules/auth';
import cartReducer from 'modules/cart';
import snackbarReducer from 'modules/snackbar';

const rootReducer = combineReducers({
  cartReducer,
  authReducer,
  snackbarReducer,
});

export default rootReducer;
