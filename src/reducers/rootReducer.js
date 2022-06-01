import { combineReducers } from 'redux';
import cartReducer from 'reducers/cart/cart.reducer';
import uiReducer from 'reducers/ui/ui.reducer';

const rootReducer = () =>
  combineReducers({
    cart: cartReducer,
    ui: uiReducer,
  });

export default rootReducer;
