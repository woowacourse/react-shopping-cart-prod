import { useRecoilState, useRecoilValue } from 'recoil';

import { cartAtom } from '../recoil/cartProductData';
import { api } from '../apis/cartProducts';
import { findTargetProduct } from '../domain/cartProductHandler';
import { hostNameAtom } from '../recoil/hostData';
import { HostNameType } from '../types/server';
import type { CartProduct } from '../types/product';
import { updateData } from '../utils/localStorage';

const updateCartProductQuantity = async (
  hostName: HostNameType,
  targetProduct: CartProduct,
  delta: number
) =>
  await api(hostName).then((apiInstance) => {
    return apiInstance.editCartProductQuantity(
      targetProduct.cartItemId,
      targetProduct.quantity + delta
    );
  });

const useProductQuantity = (productId: number) => {
  const hostName = useRecoilValue(hostNameAtom);
  const [cart, setCart] = useRecoilState(cartAtom);

  const updateCount = async (productId: number, delta: number) => {
    // const targetProduct = findTargetProduct(cart.cartItems, productId);
    const targetCartProductIndex = cart.findIndex(
      (item) => item.product.productId === productId
    );
    const targetProduct = cart[targetCartProductIndex];

    if (targetProduct) {
      await updateCartProductQuantity(hostName, targetProduct, delta);

      const newCart = [...cart];
      newCart.splice(targetCartProductIndex, 1, {
        ...cart[targetCartProductIndex],
        quantity: targetProduct.quantity + delta,
      });

      updateData('cart', newCart);
      setCart([...newCart]);
    }
  };

  const addCount = () => {
    updateCount(productId, 1);
  };

  const subtractCount = () => {
    updateCount(productId, -1);
  };

  return { addCount, subtractCount };
};

export default useProductQuantity;
