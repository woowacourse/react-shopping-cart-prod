import { ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import cartState from '@recoil/cart/cartState';
import serverState from '@recoil/server/serverState';
import userState from '@recoil/user/userState';
import { findCartItemById } from '@utils/cart/cart';
import {
  addItemToCartApi,
  removeCartItemApi,
  updateCartItemQuantityApi,
} from '@utils/cart/fetchCart';
import { FAKE_CART_ID } from '@constants/cartConstants';
import { ProductItemType } from '@type/productType';
import { useQuantityCounter } from './useQuantityCounter';
import { useRecoilCart } from './useRecoilCart';

export const useCartOperations = (product: ProductItemType) => {
  const userInfo = useRecoilValue(userState);
  const serverName = useRecoilValue(serverState);
  const cart = useRecoilValue(cartState);
  const cartId = findCartItemById({ cart, productId: product.id });
  const findCart = cart.find((cartItem) => cartItem.id === cartId)?.product.id === product.id;

  const {
    addCartItem,
    updateCartListItemQuantity,
    getCartItemQuantity,
    deleteCartItem,
    cartFetchData,
  } = useRecoilCart();

  const updateCartItemAndSync = async (value: number) => {
    try {
      updateCartListItemQuantity({ cartId, quantity: value });
      await updateCartItemQuantityApi({ cartId, quantity: value, serverName, userInfo });
    } catch (error) {
      cartFetchData();
      console.error(error);
    }
  };

  const removeCartItemAndDelete = async () => {
    try {
      deleteCartItem(cartId);
      await removeCartItemApi({ cartId, serverName, userInfo });
    } catch (error) {
      cartFetchData();
      console.error(error);
    }
  };

  const {
    quantity,
    onQuantityChange,
    countInputRef,
    increaseQuantity,
    decreaseQuantity,
    onQuantityBlur,
  } = useQuantityCounter(getCartItemQuantity(product.id), {
    removeCartItemAndDelete,
    updateCartItemAndSync,
  });

  const onAddItemToCartAndSyncClick = async () => {
    try {
      addCartItem({ cartId: FAKE_CART_ID, product });
      await addItemToCartApi({ productId: product.id, serverName, userInfo });
    } catch (error) {
      cartFetchData();
      console.error(error);
    } finally {
      cartFetchData();
    }
  };

  const onQuantityInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    const targetValue = Number(value);

    if (isNaN(targetValue)) return;

    onQuantityChange(targetValue);
  };

  return {
    onAddItemToCartAndSyncClick,
    onQuantityInputChange,
    increaseQuantity,
    decreaseQuantity,
    countInputRef,
    quantity,
    onQuantityBlur,
    findCart,
    removeCartItemAndDelete,
  };
};
