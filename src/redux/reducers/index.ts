import { combineReducers } from 'redux';

import cart from './cart';
import product from './product';
import user from './user';

const rootReducer = combineReducers({
  product,
  cart,
  user,
});

export default rootReducer;
