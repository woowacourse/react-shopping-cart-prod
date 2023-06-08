import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartListAtom, checkedItemsAtom } from 'recoil/cartList';
import { getCartList } from 'api/requests';
import { useGet } from 'hooks/useGet';
import { Cart } from 'types';

export const useFetchCart = () => {
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const setCheckedItems = useSetRecoilState(checkedItemsAtom);
  const { data } = useGet<Cart[]>(getCartList);

  useEffect(() => {
    if (!data) return;
    setCartList(data);
    setCheckedItems(data.map((item) => item.id));
  }, [data]);

  return { cartList };
};
