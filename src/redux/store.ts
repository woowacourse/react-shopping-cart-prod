import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import cartReducer from './modules/cart/cartReducer';
import userReducer from './modules/user';
import productsReducer from './modules/product/productReducer';
import snackBarReducer from './modules/snackBar';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  products: productsReducer,
  snackBar: snackBarReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));

export { store };
