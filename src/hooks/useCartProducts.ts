import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { cartProductAtom } from '../recoil/cartProductData';
import { findTargetProduct } from '../domain/cartProductHandler';
import { api } from '../apis/cartProducts';
import useProductQuantity from './useProductQuantity';
import { hostNameAtom } from '../recoil/hostData';
import type { Product } from '../types/product';

const useCartProducts = (product: Product) => {
  const { id } = product;
  const hostName = useRecoilValue(hostNameAtom);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);
  const { addCount, subtractCount } = useProductQuantity(id);
  const target = findTargetProduct(cartProducts, id);

  const addProduct = async () => {
    const cartItemId = await api(hostName).then((apiInstance) => {
      return apiInstance.postCartProduct(product.id);
    });

    if (cartItemId)
      setCartProducts([
        ...cartProducts,
        { id: Number(cartItemId), quantity: 1, product },
      ]);
  };

  const removeProduct = async () => {
    if (target) {
      api(hostName).then((apiInstance) => {
        return apiInstance.deleteCartProduct(target.id);
      });

      setCartProducts(
        cartProducts.filter((cartProduct) => cartProduct.id !== target.id)
      );
    }
  };

  useEffect(() => {
    if (!target) return;

    if (target.quantity === 0) {
      removeProduct();
    }
  }, [id, setCartProducts, target]);

  return { target, addProduct, removeProduct, addCount, subtractCount };
};

export default useCartProducts;
