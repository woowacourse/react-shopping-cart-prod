import { combineReducers } from 'redux';

import { cartListReducer } from './cartList/reducer';
import { itemReducer } from './item/reducer';
import { itemListReducer } from './itemList/reducer';
import { pageItemListReducer } from './pageItemList/reducer';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
  item: itemReducer,
  itemList: itemListReducer,
  pageItemList: pageItemListReducer,
  cartList: cartListReducer,
  user: userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
