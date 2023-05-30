import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { hostNameAtom } from '../recoil/hostData';
import { cartProductAtom } from '../recoil/cartProductData';
import { checkedItemAtom } from '../recoil/checkedProductData';
import { api } from '../apis/cartProducts';
import type { CartProduct } from '../types/product';

const useCheckedProducts = () => {
  const hostName = useRecoilValue(hostNameAtom);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);
  const [checkedProducts, setCheckedProducts] = useRecoilState(checkedItemAtom);

  const removeCheckedProducts = () => {
    const selectedProducts = checkedProducts.map(
      (cartProduct) => cartProduct.cartItemId
    );

    setCartProducts(
      cartProducts.filter(
        (cartProduct) => !selectedProducts.includes(cartProduct.cartItemId)
      )
    );
    setCheckedProducts(
      checkedProducts.filter(
        (cartProduct) => !selectedProducts.includes(cartProduct.cartItemId)
      )
    );

    selectedProducts.forEach((productId) => {
      api(hostName).then((apiInstance) => {
        return apiInstance.deleteCartProduct(productId);
      });
    });
  };

  const handleCheckBoxChange = (cartProduct: CartProduct) => {
    const updatedCheckedItems = checkedProducts.includes(cartProduct)
      ? checkedProducts.filter((item) => item !== cartProduct)
      : [...checkedProducts, cartProduct];

    setCheckedProducts(updatedCheckedItems);
  };

  const handleAllCheckedProducts = () => {
    if (cartProducts.length === checkedProducts.length) {
      setCheckedProducts([]);
      return;
    }
    setCheckedProducts(cartProducts);
  };

  const isCheckedProduct = (cartProduct: CartProduct) => {
    return checkedProducts.includes(cartProduct);
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      setCheckedProducts(cartProducts);
    }
  }, [cartProducts]);

  return {
    removeCheckedProducts,
    handleCheckBoxChange,
    handleAllCheckedProducts,
    isCheckedProduct,
  };
};

export default useCheckedProducts;
