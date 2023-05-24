import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CART_URL } from '../constants/url';
import { cartState, serverState } from '../recoil';
import { useFetchData } from './useFetchData';

export const useRemoveCheckedItemsFromCart = (checkedItemIdList: number[]) => {
  const setCart = useSetRecoilState(cartState);
  const server = useRecoilValue(serverState);

  const { api } = useFetchData();

  const removeCheckedItemsFromCart = () => {
    checkedItemIdList.forEach((id) => api.delete(`${server}${CART_URL}/${id}`));

    setCart((prev) => prev.filter((item) => !checkedItemIdList.includes(item.id)));
  };

  return removeCheckedItemsFromCart;
};
