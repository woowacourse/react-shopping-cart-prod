import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

import { productListReducer } from "@/redux/modules/productList";
import { cartListReducer } from "@/redux/modules/cartList";
import { snackbarReducer } from "@/redux/modules/snackbar";
import { userReducer } from "@/redux/modules/user";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["cartListState"],
};

export const rootReducer = combineReducers({
  productListState: productListReducer,
  cartListState: cartListReducer,
  snackbarState: snackbarReducer,
  userState: userReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(reduxThunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
