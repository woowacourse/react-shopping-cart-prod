import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

import { productListReducer } from "@/redux/modules/productList";
import { cartListReducer } from "@/redux/modules/cartList";
import { snackbarReducer } from "@/redux/modules/snackbar";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["cartListState"],
};

export const rootReducer = combineReducers({
  productListState: productListReducer,
  cartListState: cartListReducer,
  snackbarState: snackbarReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
}
