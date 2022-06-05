import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

<<<<<<< HEAD
import cartActions from 'store/cart/action';
import cartThunk from 'store/cart/thunk';
=======
import * as cartAction from 'actions/cart/action';
import * as cartThunk from 'actions/cart/thunk';
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854

const selectItems = (state) => state.items;
const selectCheckedItemList = createSelector(selectItems, (cartItems) =>
  cartItems.filter(({ isChecked }) => isChecked === true),
);

function useCart() {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const cartState = useSelector(({ cart }) => cart);
=======
  const cartState = useSelector((state) => state.cart);
  const { items, listAsyncState, curdAsyncState } = cartState;
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854

  const checkedItemList = selectCheckedItemList(cartState);

  useEffect(() => {
<<<<<<< HEAD
    dispatch(cartThunk.updateList());
  }, []);

  return {
    cartActions,
    cartThunk,
    cartState,
    computed: {
=======
    dispatch(cartThunk.getList());
  }, []);

  return {
    cartAction,
    cartThunk,
    state: {
      cartItems: items,
      cartListAsyncState: listAsyncState,
      cartCurdAsyncState: curdAsyncState,
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854
      checkedItemList,
    },
  };
}

export default useCart;
