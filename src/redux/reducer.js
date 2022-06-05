import { combineReducers } from "redux";
import productReducer from "./reducers/product-reducer/productReducer";

export default combineReducers({
  product: productReducer,
});
