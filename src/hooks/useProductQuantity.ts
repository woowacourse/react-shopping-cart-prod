import { useRecoilState, useRecoilValue } from 'recoil';

import { cartProductAtom } from '../recoil/cartProductData';
import { cartApi } from '../apis/cartProducts';
import { findTargetProduct } from '../domain/cartProductHandler';
import { hostNameAtom } from '../recoil/hostData';
import { HostNameType } from '../types/server';
import type { CartProduct } from '../types/product';

const updateCartProductQuantity = async (
  hostName: HostNameType,
  targetProduct: CartProduct,
  delta: number
) =>
  await cartApi(hostName).then((apiInstance) => {
    return apiInstance.patchCartProduct(
      targetProduct.cartItemId,
      targetProduct.quantity + delta
    );
  });

const useProductQuantity = (productId: number) => {
  const hostName = useRecoilValue(hostNameAtom);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);

  const updateCount = async (productId: number, delta: number) => {
    const targetProduct = findTargetProduct(cartProducts, productId);

    if (targetProduct) {
      await updateCartProductQuantity(hostName, targetProduct, delta);

      const cartDetails = await cartApi(hostName).then((apiInstance) => {
        return apiInstance.fetchCartProducts();
      });

      const updatedCartProducts = cartDetails.cartItems;

      setCartProducts(updatedCartProducts);
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
