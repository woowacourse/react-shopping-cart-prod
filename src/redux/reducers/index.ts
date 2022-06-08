import { combineReducers } from 'redux';
import cart from 'redux/reducers/cart';
import products from 'redux/reducers/products';
import productDetail from 'redux/reducers/productDetail';
import customer from 'redux/reducers/customer';

const rootReducer = combineReducers({
  customerState: customer,
  productsState: products,
  productDetailState: productDetail,
  cartState: cart,
});

export default rootReducer;
