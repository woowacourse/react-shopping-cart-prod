import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useExcludeCart = id => {
  const { isLoggedIn } = useSelector((state: any) => state.customer);

  const { cartList } = useSelector((state: any) => state.cart);

  const isShowCartButton = useMemo(
    () => !cartList.find(cart => cart.productId === id),
    [cartList, id],
  );

  return { isShowCartButton: isShowCartButton && isLoggedIn };
};
