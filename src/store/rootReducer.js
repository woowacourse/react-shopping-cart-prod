import { combineReducers } from 'redux';

import reducer from 'reducers/reducer';
import authReducer from 'reducers/authReducer';

const rootReducer = combineReducers({
  reducer,
  authReducer,
});

export default rootReducer;
