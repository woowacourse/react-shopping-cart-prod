import { CartItem } from 'types/domain';
import useUpdateCartItem from '../../../hooks/useUpdateCartItem';

export const useCartList = (cartList: CartItem[]) => {
  const { toggleCartItemAllChecked, removeSelectedCartItem } = useUpdateCartItem(cartList);
  const isAllItemChecked = cartList.every(cartItem => cartItem.checked);

  const toggleCheckedAll = () => {
    const targetItemList = cartList.filter(cartItem => cartItem.checked === isAllItemChecked);

    toggleCartItemAllChecked(targetItemList);
  };

  const deleteSelectedItem = () => {
    removeSelectedCartItem();
  };

  return { isAllItemChecked, toggleCheckedAll, deleteSelectedItem };
};
