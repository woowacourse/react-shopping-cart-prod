import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartListState, selectedHostState } from '../recoil/atoms';
import { CartItemInfo, ProductInfo } from '../types';
import { CART_BASE_URL } from '../constants';
import { useSetFetchedData } from './useSetFetchedData';
import { currentCartListState } from '../recoil/selectors';

export const useCart = (productInfo?: ProductInfo) => {
  const host = useRecoilValue(selectedHostState);
  const setCartList = useSetRecoilState(cartListState);
  const cartList = useRecoilValue(currentCartListState);
  const { api } = useSetFetchedData<CartItemInfo[]>(`${host}${CART_BASE_URL}`, setCartList);

  const getCartItem = (productId?: number) => {
    const curProductId = productId ? productId : productInfo?.id;

    return cartList.find((cartItem) => cartItem.product.id === curProductId);
  };

  const addToCart = () => {
    if (!productInfo) return;
    api.post(`${host}${CART_BASE_URL}`, { productId: productInfo.id }, `${host}${CART_BASE_URL}`);
  };

  const updateProductQuantity = (quantity: number) => {
    const currentCartItem = getCartItem();
    if (!currentCartItem) return;

    if (quantity <= 0) {
      deleteFromCart(currentCartItem.id);
      return;
    }

    api.patch(
      `${host}${CART_BASE_URL}/${currentCartItem.id}`,
      { quantity: quantity },
      `${host}${CART_BASE_URL}`
    );
  };

  const deleteFromCart = (cartId: number) => {
    api.delete(`${host}${CART_BASE_URL}/${cartId}`, `${host}${CART_BASE_URL}`);
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
