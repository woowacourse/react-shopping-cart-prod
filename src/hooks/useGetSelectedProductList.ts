import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CART_URL } from '../constants/url';
import { cartState, checkedItemList, serverState } from '../recoil';
import { CartItem } from '../types';
import { useFetchData } from './useFetchData';

export const useGetSelectedProductList = () => {
  const server = useRecoilValue(serverState);
  const { api, isLoading } = useFetchData();

  const [cart, setCart] = useRecoilState(cartState);
  const [checkedItemIdList, setCheckedItemIdList] = useRecoilState<number[]>(checkedItemList);

  useEffect(() => {
    api
      .get(`${server}${CART_URL}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      })
      .then((data) => {
        setCart(data);
        setCheckedItemIdList(data.map((item: CartItem) => item.id));
      });
  }, [server]);

  return { cart, checkedItemIdList, setCheckedItemIdList, isLoading };
};
