import { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { cartListAtom, fetchCartListSelector } from 'recoil/cartList';

export const useFetchCart = () => {
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const cartListResponse = useRecoilValueLoadable(fetchCartListSelector);

  useEffect(() => {
    if (cartListResponse.state === 'hasValue') {
      setCartList(cartListResponse.contents);
    }
  }, []);

  return { cartList, setCartList };
};
