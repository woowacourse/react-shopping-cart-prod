import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartListState } from '../recoil/atoms';
import { CartItemInfo, ProductInfo } from '../types';
import { CART_BASE_URL } from '../constants';
import { useSetFetchedData } from './useSetFetchedData';
import { currentCartListState } from '../recoil/selectors';

export const useCart = (productInfo?: ProductInfo) => {
  const setCartList = useSetRecoilState(cartListState);
  const cartList = useRecoilValue(currentCartListState);
  // const host = useRecoilValue(selectedHostState);
  // const CART_URL = `${host}${CART_BASE_URL}`;
  const CART_URL = CART_BASE_URL;
  const { api } = useSetFetchedData<CartItemInfo[]>(CART_URL, setCartList);

  const getCartItem = (productId?: number) => {
    const curProductId = productId ? productId : productInfo?.id;

    return cartList.find((cartItem) => cartItem.product.id === curProductId);
  };

  const addToCart = () => {
    if (!productInfo) return;
    api.post(CART_URL, { productId: productInfo.id }, CART_URL);
  };

  const updateProductQuantity = (quantity: number) => {
    const currentCartItem = getCartItem();
    if (!currentCartItem) return;

    if (quantity <= 0) {
      deleteFromCart(currentCartItem.id);
      return;
    }

    api.patch(`${CART_URL}/${currentCartItem.id}`, { quantity: quantity }, CART_URL);
  };

  const deleteFromCart = (cartId: number) => {
    api.delete(`${CART_URL}/${cartId}`, CART_URL);
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
