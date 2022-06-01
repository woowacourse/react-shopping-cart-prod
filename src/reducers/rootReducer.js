import { combineReducers } from 'redux';
import cartReducer from 'reducers/cart/cart.reducer';
import uiReducer from 'reducers/ui/ui.reducer';
import userReducer from 'reducers/user/user.reducer';

const rootReducer = () =>
  combineReducers({
    cart: cartReducer,
    ui: uiReducer,
    user: userReducer,
  });

export default rootReducer;
