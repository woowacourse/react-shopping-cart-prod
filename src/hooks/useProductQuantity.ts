import { useRecoilState, useRecoilValue } from 'recoil';
import { cartProductAtom } from '../recoil/cartProductData';
import { findTargetProduct } from '../domain/cartProductHandler';
import { cartApiAtom } from '../recoil/hostData';

const useProductQuantity = (productId: number, maxStock: number) => {
  const cartApiInstance = useRecoilValue(cartApiAtom);
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

      await cartApiInstance.patchCartProduct(
        targetProduct.cartItemId,
        targetProduct.quantity + delta
      );

      const updatedCartProducts = await cartApiInstance.fetchCartProducts();

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
