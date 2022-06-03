import { combineReducers } from 'redux';

import reducer from 'reducers/reducer';
import authReducer from 'reducers/authReducer';
import snackbarReducer from 'reducers/snackbarReducer';

const rootReducer = combineReducers({
  reducer,
  authReducer,
  snackbarReducer,
});

export default rootReducer;
