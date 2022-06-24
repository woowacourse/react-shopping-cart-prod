import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";

import cartReducer from "./reducers/cart/cartReducer";
import userReducer from "./reducers/user/userReducer";

const rootReducer = combineReducers({
  cartReducer,
  userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
