import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";

import { cartReducer } from "@/redux/modules/cart";
import { snackbarReducer } from "@/redux/modules/snackbar";
import { userReducer } from "@/redux/modules/user";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["cartListState"],
};

export const rootReducer = combineReducers({
  snackbarState: snackbarReducer,
  userState: userReducer,
  cartState: cartReducer,
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
