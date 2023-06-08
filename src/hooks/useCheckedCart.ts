import type { CartItemType } from '../types/product';

import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { api } from '../apis/cartItems';
import { hostNameAtom } from '../recoil/hostData';
import { cartAtom } from '../recoil/cartItemData';
import { checkedCartItemIdsAtom } from '../recoil/checkedCartItemData';

const useCheckedCart = () => {
  const hostName = useRecoilValue(hostNameAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [checkedCartItemIds, setCheckedCartItemIds] = useRecoilState(
    checkedCartItemIdsAtom
  );

  const removeCheckedProducts = () => {
    const updatedCartItems = cart.filter(
      (item) => !checkedCartItemIds.includes(item.cartItemId)
    );

    setCart([...updatedCartItems]);

    setCheckedCartItemIds(
      checkedCartItemIds.filter(
        (cartItemId) => !checkedCartItemIds.includes(cartItemId)
      )
    );

    checkedCartItemIds.forEach(async (cartItemId) => {
      await (await api(hostName)).deleteCartProduct(cartItemId);
    });
  };

  const handleCheckBoxChange = (cartItem: CartItemType) => {
    if (isCheckedProduct(cartItem)) {
      setCheckedCartItemIds(
        checkedCartItemIds.filter(
          (cartItemId) => cartItemId !== cartItem.cartItemId
        )
      );
    } else {
      setCheckedCartItemIds([...checkedCartItemIds, cartItem.cartItemId]);
    }
  };

  const handleAllCheckedCartItems = () => {
    if (cart.length === checkedCartItemIds.length) {
      setCheckedCartItemIds([]);
      return;
    }
    setCheckedCartItemIds(cart.map((item) => item.cartItemId));
  };

  const isCheckedProduct = (cartItem: CartItemType) => {
    return checkedCartItemIds.includes(cartItem.cartItemId);
  };

  useEffect(() => {
    setCheckedCartItemIds(cart.map((item) => item.cartItemId));
  }, []);

  return {
    removeCheckedProducts,
    handleCheckBoxChange,
    handleAllCheckedCartItems,
    isCheckedProduct,
  };
};

export default useCheckedCart;
