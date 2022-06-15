import {
  postCartItem,
  patchCartItem,
  deleteSelectedCartItem,
  getCartList,
} from 'redux/action-creators/cartListThunk';
import { useAppDispatch } from './useAppDispatch';
import { CartItem } from 'types/domain';
import { CartListAction } from 'redux/actions/cartList';

const useUpdateCartItem = (cartList: CartItem[]) => {
  const dispatch = useAppDispatch<CartListAction>();

  const increaseQuantity = async (id: number, updateQuantity = 1) => {
    const targetItem = cartList.find(cartItem => cartItem.productId === id);

    if (targetItem) {
      dispatch(
        patchCartItem([
          {
            id: targetItem.id,
            quantity: targetItem.quantity + updateQuantity,
            checked: true,
          },
        ])
      );

      return;
    }

    await dispatch(postCartItem({ id, quantity: 1, checked: true }));
    dispatch(getCartList());
  };

  const decreaseQuantity = (id: number, updateQuantity = 1) => {
    const targetItem = cartList.find(cartItem => cartItem.productId === id);

    if (targetItem.quantity > 0) {
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
    increaseQuantity,
    decreaseQuantity,
    toggleCartItemChecked,
    toggleCartItemAllChecked,
    removeCartItem,
    removeSelectedCartItem,
  };
};

export default useUpdateCartItem;
