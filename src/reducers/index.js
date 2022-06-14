import { combineReducers } from "redux";

import productList from "./productList";
import cartList from "./cartList";
import user from "./user";
import server from "./server";

export default combineReducers({
  productList,
  cartList,
  user,
  server,
});
