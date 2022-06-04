import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from 'redux/modules/cart';
import customerReducer from 'redux/modules/customer';
import productsReducer from 'redux/modules/products';
import snackBarReducer from 'redux/modules/snackBar';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['snackBar'],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  customer: customerReducer,
  products: productsReducer,
  snackBar: snackBarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk, logger));
const persistor = persistStore(store);

export { store, persistor };
