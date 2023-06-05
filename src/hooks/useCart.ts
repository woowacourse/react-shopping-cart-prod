import type { Product } from '../types/product';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { api } from '../apis/cartProducts';
import { findTargetProduct } from '../domain/cartProductHandler';
import useProductQuantity from './useProductQuantity';
import { cartAtom } from '../recoil/cartProductData';
import { hostNameAtom } from '../recoil/hostData';
import { checkedCartItemIdsAtom } from '../recoil/checkedProductData';

const useCart = (product: Product) => {
  const { productId } = product;
  const hostName = useRecoilValue(hostNameAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [checkedCartItemIds, setCheckedCartItemIds] = useRecoilState(
    checkedCartItemIdsAtom
  );
  const { addCount, subtractCount } = useProductQuantity(productId);
  const target = findTargetProduct(cart, productId);

  const addProduct = async () => {
    const cartItemId = await api(hostName).then((apiInstance) => {
      return apiInstance.createCartProduct(productId);
    });

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
      await api(hostName).then((apiInstance) => {
        return apiInstance.deleteCartProduct(target.cartItemId);
      });

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
