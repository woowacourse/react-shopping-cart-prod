import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import cartReducer from 'redux/modules/cart';
import customerReducer from 'redux/modules/customer';
import productsReducer from 'redux/modules/products';
import snackBarReducer from 'redux/modules/snackBar';

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
