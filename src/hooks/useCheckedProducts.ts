import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { hostNameAtom } from '../recoil/hostData';
import { cartAtom } from '../recoil/cartProductData';
import { checkedCartItemIdsAtom } from '../recoil/checkedProductData';
import { api } from '../apis/cartProducts';
import type { CartProduct } from '../types/product';

const useCheckedProducts = () => {
  const hostName = useRecoilValue(hostNameAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [checkedCartItemIds, setCheckedCartItemIds] = useRecoilState(
    checkedCartItemIdsAtom
  );

  const removeCheckedProducts = () => {
    const updatedCartProducts = cart.cartItems.filter(
      (item) => !checkedCartItemIds.includes(item.cartItemId)
    );

    setCart({ ...cart, cartItems: updatedCartProducts });

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

  const handleCheckBoxChange = (cartProduct: CartProduct) => {
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
    if (cart.cartItems.length === checkedCartItemIds.length) {
      setCheckedCartItemIds([]);
      return;
    }
    setCheckedCartItemIds(cart.cartItems.map((item) => item.cartItemId));
  };

  const isCheckedProduct = (cartProduct: CartProduct) => {
    return checkedCartItemIds.includes(cartProduct.cartItemId);
  };

  useEffect(() => {
    setCheckedCartItemIds(cart.cartItems.map((item) => item.cartItemId));
  }, []);

  return {
    removeCheckedProducts,
    handleCheckBoxChange,
    handleAllCheckedProducts,
    isCheckedProduct,
  };
};

export default useCheckedProducts;
