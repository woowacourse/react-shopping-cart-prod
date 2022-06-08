import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import cartReducer from './modules/cart/cartReducer';
import customerReducer from './modules/customer';
import productsReducer from './modules/product/productReducer';
import snackBarReducer from './modules/snackBar';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  cart: cartReducer,
  customer: customerReducer,
  products: productsReducer,
  snackBar: snackBarReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));

export { store };
