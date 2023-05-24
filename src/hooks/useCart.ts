import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartListState } from '../recoil/atoms';
import { CartItemInfo, ProductInfo } from '../types';
import { CART_BASE_URL } from '../constants';
import { useSetFetchedData } from './useSetFetchedData';
import { currentCartListState } from '../recoil/selectors';

export const useCart = (productInfo?: ProductInfo) => {
  const setCartList = useSetRecoilState(cartListState);
  const cartList = useRecoilValue(currentCartListState);
  const { api } = useSetFetchedData<CartItemInfo[]>(CART_BASE_URL, setCartList);

  const getCartItem = (productId?: number) => {
    const curProductId = productId ? productId : productInfo?.id;

    return cartList.find((cartItem) => cartItem.product.id === curProductId);
  };

  const addToCart = () => {
    if (!productInfo) return;
    api.post(CART_BASE_URL, { productId: productInfo.id }, CART_BASE_URL);
  };

  const updateProductQuantity = (quantity: number) => {
    if (quantity <= 0) {
      deleteFromCart();
      return;
    }
    const currentCartItem = getCartItem();
    if (!currentCartItem) return;

    api.patch(`${CART_BASE_URL}/${currentCartItem.id}`, { quantity: quantity }, CART_BASE_URL);
  };

  const deleteFromCart = (productId?: number) => {
    const curProductId = productId ? productId : productInfo?.id;

    const currentCartItem = getCartItem(curProductId);
    if (!currentCartItem) return;

    api.delete(`${CART_BASE_URL}/${currentCartItem.id}`, CART_BASE_URL);
  };

  return {
    cartList,
    setCartList,
    getCartItem,
    addToCart,
    deleteFromCart,
    updateProductQuantity,
  };
};
