import {
  postCartItem,
  patchCartItem,
  deleteSelectedCartItem,
} from 'redux/action-creators/cartListThunk';
import { useAppDispatch } from './useAppDispatch';
import { CartItem } from 'types/domain';
import { CartListAction } from 'redux/actions/cartList';

const useUpdateCartItem = (cartList: CartItem[]) => {
  const dispatch = useAppDispatch<CartListAction>();

  const updateCartItemQuantity = (id: number, type = 'Increase', updateQuantity = 1) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);

    if (type === 'Increase') {
      if (!targetItem) {
        dispatch(postCartItem({ id, quantity: 1, checked: true }));

        return;
      }

      dispatch(
        patchCartItem([
          {
            productId: targetItem.id,
            quantity: targetItem.quantity + updateQuantity,
            checked: true,
          },
        ])
      );

      return;
    }
    if (type === 'Decrease') {
      if (targetItem.quantity - updateQuantity > 0) {
        dispatch(
          patchCartItem([
            {
              id: targetItem.id,
              quantity: targetItem.quantity - updateQuantity,
              checked: true,
            },
          ])
        );
      }
      if (targetItem.quantity - updateQuantity <= 0) {
        dispatch(deleteSelectedCartItem([targetItem]));
      }
    }
  };

  const removeCartItem = (id: number) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);

    dispatch(deleteSelectedCartItem([targetItem]));
  };

  const removeSelectedCartItem = () => {
    const targetItemList = cartList.filter(cartItem => cartItem.checked);

    dispatch(deleteSelectedCartItem(targetItemList));
  };

  const toggleCartItemChecked = (id: number) => {
    const targetItem = cartList.find(cartItem => cartItem.id === id);

    dispatch(
      patchCartItem([
        { ...targetItem, id, quantity: targetItem.quantity, checked: !targetItem.checked },
      ])
    );
  };

  const toggleCartItemAllChecked = (cartList: CartItem[]) => {
    const changedCheckItemList = cartList.map(cartItem => ({
      ...cartItem,
      checked: !cartItem.checked,
    }));

    dispatch(patchCartItem(changedCheckItemList));
  };

  return {
    updateCartItemQuantity,
    toggleCartItemChecked,
    toggleCartItemAllChecked,
    removeCartItem,
    removeSelectedCartItem,
  };
};

export default useUpdateCartItem;
