import { combineReducers } from 'redux';

import { productReducer } from 'store/product/reducer';

import cart from './cart';
import members from './members';

export default combineReducers({ product: productReducer, members, cart });
