import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { cartProductAtom } from '../recoil/cartProductData';
import { deleteProduct, findTargetProduct } from '../domain/cartProductHandler';
import { api } from '../apis/cartProducts';
import useProductQuantity from './useProductQuantity';
import { hostNameAtom } from '../recoil/hostData';
import type { Product } from '../types/product';

const useCartProducts = (product: Product) => {
  const { productId } = product;
  const hostName = useRecoilValue(hostNameAtom);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);
  const { addCount, subtractCount } = useProductQuantity(productId);
  const target = findTargetProduct(cartProducts, productId);

  const addProduct = async () => {
    const cartItemId = await api(hostName).then((apiInstance) => {
      return apiInstance.postCartProduct(product.productId);
    });

    if (cartItemId)
      setCartProducts([
        ...cartProducts,
        { cartItemId: Number(cartItemId), quantity: 1, product },
      ]);
  };

  const removeProduct = () => {
    if (target) {
      api(hostName).then((apiInstance) => {
        return apiInstance.deleteCartProduct(target.cartItemId);
      });

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
