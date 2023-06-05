import type { CartProduct } from '../types/product';

import { useRecoilState, useRecoilValue } from 'recoil';

import { api } from '../apis/cartProducts';
import { cartAtom } from '../recoil/cartProductData';
import { hostNameAtom } from '../recoil/hostData';
import { HostNameType } from '../types/server';

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
    const targetCartProductIndex = cart.findIndex(
      (item) => item.product.productId === productId
    );
    const targetProduct = cart[targetCartProductIndex];

    if (targetProduct) {
      const { quantity, product } = targetProduct;

      if (quantity + delta > product.stock) {
        alert('재고 이하의 수량만 담을 수 있어요😢');
        return;
      }

      await updateCartProductQuantity(hostName, targetProduct, delta);

      const newCart = [...cart];
      newCart.splice(targetCartProductIndex, 1, {
        ...cart[targetCartProductIndex],
        quantity: targetProduct.quantity + delta,
      });

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
