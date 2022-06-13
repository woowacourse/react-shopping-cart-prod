import { combineReducers } from 'redux';

import authReducer from 'modules/auth';
import cartReducer from 'modules/cart';
import snackbarReducer from 'modules/snackbar';
import spinnerReducer from 'modules/spinner';

const rootReducer = combineReducers({
  cartReducer,
  authReducer,
  snackbarReducer,
  spinnerReducer,
});

export default rootReducer;
