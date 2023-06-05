import type { CartItem } from '../types/product';

import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { api } from '../apis/cartItems';
import { hostNameAtom } from '../recoil/hostData';
import { cartAtom } from '../recoil/cartItemData';
import { checkedCartItemIdsAtom } from '../recoil/checkedCartItemData';

const useCheckedProducts = () => {
  const hostName = useRecoilValue(hostNameAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [checkedCartItemIds, setCheckedCartItemIds] = useRecoilState(
    checkedCartItemIdsAtom
  );

  const removeCheckedProducts = () => {
    const updatedCartProducts = cart.filter(
      (item) => !checkedCartItemIds.includes(item.cartItemId)
    );

    setCart([...updatedCartProducts]);

    setCheckedCartItemIds(
      checkedCartItemIds.filter(
        (cartItemId) => !checkedCartItemIds.includes(cartItemId)
      )
    );

    checkedCartItemIds.forEach((cartItemId) => {
      api(hostName).then((apiInstance) => {
        return apiInstance.deleteCartProduct(cartItemId);
      });
    });
  };

  const handleCheckBoxChange = (cartProduct: CartItem) => {
    if (isCheckedProduct(cartProduct)) {
      setCheckedCartItemIds(
        checkedCartItemIds.filter(
          (cartItemId) => cartItemId !== cartProduct.cartItemId
        )
      );
    } else {
      setCheckedCartItemIds([...checkedCartItemIds, cartProduct.cartItemId]);
    }
  };

  const handleAllCheckedProducts = () => {
    if (cart.length === checkedCartItemIds.length) {
      setCheckedCartItemIds([]);
      return;
    }
    setCheckedCartItemIds(cart.map((item) => item.cartItemId));
  };

  const isCheckedProduct = (cartItem: CartItem) => {
    return checkedCartItemIds.includes(cartItem.cartItemId);
  };

  useEffect(() => {
    setCheckedCartItemIds(cart.map((item) => item.cartItemId));
  }, []);

  return {
    removeCheckedProducts,
    handleCheckBoxChange,
    handleAllCheckedProducts,
    isCheckedProduct,
  };
};

export default useCheckedProducts;
