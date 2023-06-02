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
  delta: number,
  maxStock: number
) =>
  await cartApi(hostName).then((apiInstance) => {
    return apiInstance.patchCartProduct(
      targetProduct.cartItemId,
      targetProduct.quantity + delta
    );
  });

const useProductQuantity = (productId: number, maxStock: number) => {
  const hostName = useRecoilValue(hostNameAtom);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);

  const updateCount = async (productId: number, delta: number) => {
    const targetProduct = findTargetProduct(cartProducts, productId);

    if (targetProduct) {
      const updatedQuantity = Math.min(
        Math.max(targetProduct.quantity + delta, 0),
        maxStock
      );

      if (updatedQuantity === targetProduct.quantity) {
        alert(
          `상품 재고 ${targetProduct.quantity}개 이상으로 구매할 수 없습니다.`
        );
        return;
      }

      await updateCartProductQuantity(hostName, targetProduct, delta, maxStock);

      const updatedCartProducts = await cartApi(hostName).then(
        (apiInstance) => {
          return apiInstance.fetchCartProducts();
        }
      );

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
