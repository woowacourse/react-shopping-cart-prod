import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import { cartReducer } from './cart/reducer';
import { productReducer } from './product/reducer';
import { userReducer } from './user/reducer';

const reducers = combineReducers({ product: productReducer, cart: cartReducer, user: userReducer });

export default createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk, ReduxLogger)));
