import { combineReducers } from 'redux';
import cart from 'redux/reducers/cart';
import products from 'redux/reducers/products';
import productDetail from 'redux/reducers/productDetail';

const rootReducer = combineReducers({
  productsState: products,
  productDetailState: productDetail,
  cartState: cart,
});

export default rootReducer;
