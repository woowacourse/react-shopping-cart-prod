import { combineReducers } from 'redux';

import cart from 'redux/reducers/cart';
import productDetail from 'redux/reducers/productDetail';
import products from 'redux/reducers/products';
import user from 'redux/reducers/user';

const rootReducer = combineReducers({
  productsState: products,
  productDetailState: productDetail,
  cartState: cart,
  userState: user,
});

export default rootReducer;
