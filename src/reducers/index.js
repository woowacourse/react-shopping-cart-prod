import { combineReducers } from 'redux';

import cart from './cart';
import members from './members';
import products from './products';

export default combineReducers({ products, members, cart });
