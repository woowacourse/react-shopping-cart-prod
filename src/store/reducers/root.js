import { combineReducers } from 'redux';

import cartReducer from 'store/reducers/cart.reducer';
import productReducer from 'store/reducers/product.reducer';
import userReducer from 'store/reducers/user.reducer';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
