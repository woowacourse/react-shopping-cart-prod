import { combineReducers } from 'redux';

import { cartReducer } from 'store/cart/reducer';
import { productReducer } from 'store/product/reducer';

import members from './members';

export default combineReducers({ product: productReducer, members, cart: cartReducer });
