import { combineReducers } from 'redux';
import snackbar from './snackbar';
import products from './products';
import product from './product';
import user from './user';
import cart from './cart';
import spinner from './spinner';

export default combineReducers({ products, product, user, cart, snackbar, spinner });
