import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CART_URL } from '../constants/url';
import { cartState, serverState } from '../recoil';
import { CartItem } from '../types';
import { useFetchData } from './useFetchData';

export const useRemoveCheckedItemsFromCart = (checkedItemIdList: number[]) => {
  const setCart = useSetRecoilState(cartState);
  const server = useRecoilValue(serverState);

  const { api } = useFetchData();

  const removeAllCheckedItemsFromCart = (prev: CartItem[]) => {
    const cart = [...prev];
    const updatedCart = cart.filter((item) => !checkedItemIdList.includes(item.id));

    return updatedCart;
  };

  const removeCheckedItemsFromCart = () => {
    checkedItemIdList.forEach((id) => api.delete(`${server}${CART_URL}/${id}`));
    setCart((prev: CartItem[]) => removeAllCheckedItemsFromCart(prev));
  };

  return removeCheckedItemsFromCart;
};
