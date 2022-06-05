import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import cartActions from 'store/cart/action';
import cartThunk from 'store/cart/thunk';

const selectItems = (state) => state.items;
const selectCheckedItemList = createSelector(selectItems, (cartItems) =>
  cartItems.filter(({ isChecked }) => isChecked === true),
);

function useCart() {
  const dispatch = useDispatch();
  const cartState = useSelector(({ cart }) => cart);

  const checkedItemList = selectCheckedItemList(cartState);

  useEffect(() => {
    dispatch(cartThunk.updateList());
  }, []);

  return {
    cartActions,
    cartThunk,
    cartState,
    computed: {
      checkedItemList,
    },
  };
}

export default useCart;
