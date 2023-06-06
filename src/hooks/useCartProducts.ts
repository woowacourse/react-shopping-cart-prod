import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartProductAtom } from '../recoil/cartProductData';
import { deleteProduct, findTargetProduct } from '../domain/cartProductHandler';
import useProductQuantity from './useProductQuantity';
import { cartApiAtom } from '../recoil/hostData';
import type { Product } from '../types/product';

const useCartProducts = (product: Product) => {
  const { productId } = product;
  const cartApiInstance = useRecoilValue(cartApiAtom);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);
  const { addCount, subtractCount } = useProductQuantity(
    productId,
    product.stock
  );
  const target = findTargetProduct(cartProducts, productId);

  const addProduct = async () => {
    const cartItemId = await cartApiInstance.postCartProduct(product.productId);

    if (cartItemId)
      setCartProducts([
        ...cartProducts,
        { cartItemId: Number(cartItemId), quantity: 1, product },
      ]);
  };

  const removeProduct = () => {
    if (target) {
      cartApiInstance.deleteCartProduct(target.cartItemId);

      setCartProducts(deleteProduct(cartProducts, target.cartItemId));
    }
  };

  useEffect(() => {
    if (!target) return;

    if (target.quantity === 0) {
      removeProduct();
    }
  }, [productId, setCartProducts, target]);

  return { target, addProduct, removeProduct, addCount, subtractCount };
};

export default useCartProducts;
