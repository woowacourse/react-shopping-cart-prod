import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import * as cartAction from 'actions/cart/action';
import * as cartThunk from 'actions/cart/thunk';

const selectItems = (state) => state.items;
const selectCheckedItemList = createSelector(selectItems, (cartItems) => {
  console.log('계산 시도!');
  return cartItems.filter(({ isChecked }) => isChecked === true);
});

function useCart() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { items, listAsyncState, curdAsyncState } = cartState;

  console.log('값 로드!', items);
  const checkedItemList = selectCheckedItemList(cartState);

  useEffect(() => {
    dispatch(cartThunk.getList());
  }, []);

  return {
    cartAction,
    cartThunk,
    state: {
      cartItems: items,
      cartListAsyncState: listAsyncState,
      cartCurdAsyncState: curdAsyncState,
      checkedItemList,
    },
  };
}

export default useCart;
