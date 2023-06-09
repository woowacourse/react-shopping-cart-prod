import type { ProductType } from '../types/product';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { api } from '../apis/cartItems';
import { findTargetProduct } from '../domain/cartItemHandler';
import useProductQuantity from './useProductQuantity';
import { cartAtom } from '../recoil/cartItemData';
import { hostNameAtom } from '../recoil/hostData';
import { checkedCartItemIdsAtom } from '../recoil/checkedCartItemData';

const useCart = (product: ProductType) => {
  const { productId } = product;
  const hostName = useRecoilValue(hostNameAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [checkedCartItemIds, setCheckedCartItemIds] = useRecoilState(
    checkedCartItemIdsAtom
  );
  const { addCount, subtractCount } = useProductQuantity(productId);
  const target = findTargetProduct(cart, productId);

  const addProduct = async () => {
    const cartItemId = await (await api(hostName)).createCartProduct(productId);

    if (cartItemId) {
      const updatedCartProducts = [
        ...cart,
        { cartItemId: Number(cartItemId), quantity: 1, product },
      ];

      setCart([...updatedCartProducts]);
    }
  };

  const removeProduct = async () => {
    if (target) {
      await (await api(hostName)).deleteCartProduct(target.cartItemId);

      const updatedCartProducts = cart.filter(
        (cartProduct) => cartProduct.cartItemId !== target.cartItemId
      );

      setCheckedCartItemIds(
        checkedCartItemIds.filter((id) => id !== target.cartItemId)
      );
      setCart([...updatedCartProducts]);
    }
  };

  useEffect(() => {
    if (!target) return;

    if (target.quantity === 0) {
      removeProduct();
    }
  }, [productId, setCart, target]);

  return { target, addProduct, removeProduct, addCount, subtractCount };
};

export default useCart;
