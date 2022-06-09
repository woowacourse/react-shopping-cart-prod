import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

import { productListReducer } from "@/redux/modules/productList";
import { cartListReducer } from "@/redux/modules/cartList";
import { snackbarReducer } from "@/redux/modules/snackbar";
import { productDetailReducer } from "@/redux/modules/productDetail";

export const rootReducer = combineReducers({
  productListState: productListReducer,
  cartListState: cartListReducer,
  snackbarState: snackbarReducer,
  productDetailState: productDetailReducer,
});

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return { store };
}
