import { combineReducers } from 'redux';
import cartReducer from 'store/reducers/cart';
import productReducer from 'store/reducers/product';
import userReducer from 'store/reducers/user';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
