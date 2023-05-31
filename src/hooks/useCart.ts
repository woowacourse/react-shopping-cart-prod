import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { cartAtom } from '../recoil/cartProductData';
import { findTargetProduct } from '../domain/cartProductHandler';
import { api } from '../apis/cartProducts';
import useProductQuantity from './useProductQuantity';
import { hostNameAtom } from '../recoil/hostData';
import type { Product } from '../types/product';
import { updateData } from '../utils/localStorage';
import { checkedCartItemIdsAtom } from '../recoil/checkedProductData';

const useCart = (product: Product) => {
  const { productId } = product;
  const hostName = useRecoilValue(hostNameAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [checkedCartItemIds, setCheckedCartItemIds] = useRecoilState(
    checkedCartItemIdsAtom
  );
  const { addCount, subtractCount } = useProductQuantity(productId);
  const target = findTargetProduct(cart.cartItems, productId);

  const addProduct = async () => {
    const cartItemId = await api(hostName).then((apiInstance) => {
      return apiInstance.createCartProduct(product.productId);
    });

    if (cartItemId) {
      const updatedCartProducts = [
        ...cart.cartItems,
        { cartItemId: Number(cartItemId), quantity: 1, product },
      ];

      const newCart = { ...cart, cartItems: updatedCartProducts };
      setCart(newCart);

      updateData('cart', newCart);
    }
  };

  const removeProduct = async () => {
    if (target) {
      await api(hostName).then((apiInstance) => {
        return apiInstance.deleteCartProduct(target.cartItemId);
      });

      const updatedCartProducts = cart.cartItems.filter(
        (cartProduct) => cartProduct.cartItemId !== target.cartItemId
      );

      const newCart = { ...cart, cartItems: updatedCartProducts };
      setCheckedCartItemIds(
        checkedCartItemIds.filter((id) => id !== target.cartItemId)
      );
      setCart(newCart);

      updateData('cart', newCart);
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
