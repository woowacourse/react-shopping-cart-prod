import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartApiAtom } from '../recoil/hostData';
import { cartProductAtom } from '../recoil/cartProductData';
import { checkedItemAtom } from '../recoil/checkedProductData';

const useCheckedProducts = () => {
  const cartApiInstance = useRecoilValue(cartApiAtom);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductAtom);
  const [checkedProducts, setCheckedProducts] = useRecoilState(checkedItemAtom);

  const removeCheckedProducts = () => {
    const selectedProducts = checkedProducts.map((product) => product);

    setCartProducts(
      cartProducts.filter(
        (product) => !selectedProducts.includes(product.cartItemId)
      )
    );

    setCheckedProducts(
      checkedProducts.filter((product) => !selectedProducts.includes(product))
    );

    selectedProducts.forEach((productId) => {
      cartApiInstance.deleteCartProduct(productId);
    });
  };

  const handleCheckBoxChange = (cartProductId: number) => {
    const updatedCheckedItems = checkedProducts.includes(cartProductId)
      ? checkedProducts.filter((id) => id !== cartProductId)
      : [...checkedProducts, cartProductId];

    setCheckedProducts(updatedCheckedItems);
  };

  const handleAllCheckedProducts = () => {
    const cartProductIds = cartProducts.map((product) => product.cartItemId);

    if (cartProductIds.length === checkedProducts.length) {
      setCheckedProducts([]);
      return;
    }

    setCheckedProducts(cartProductIds);
  };

  const isCheckedProduct = (cartProductId: number) => {
    return checkedProducts.includes(cartProductId);
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      const cartProductIds = cartProducts.map((product) => product.cartItemId);
      setCheckedProducts(cartProductIds);
    }
  }, []);

  return {
    removeCheckedProducts,
    handleCheckBoxChange,
    handleAllCheckedProducts,
    isCheckedProduct,
  };
};

export default useCheckedProducts;
