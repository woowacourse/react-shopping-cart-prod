import { combineReducers } from "redux";

import productList from "./productList";
import cartList from "./cartList";
import user from "./user";

export default combineReducers({
  productList,
  cartList,
  user,
});
