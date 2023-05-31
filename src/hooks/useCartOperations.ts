import { ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import cartState from '@recoil/cart/cartState';
import serverState from '@recoil/server/serverState';
import { findCartItemById } from '@utils/cart/cart';
import {
  addItemToCartApi,
  removeCartItemApi,
  updateCartItemQuantityApi,
} from '@utils/cart/fetchCart';
import { ProductItemType } from '@type/productType';
import { useQuantityCounter } from './useQuantityCounter';
import { useRecoilCart } from './useRecoilCart';

export const useCartOperations = (product: ProductItemType) => {
  const serverName = useRecoilValue(serverState);
  const cart = useRecoilValue(cartState);
  const cartId = findCartItemById({ cart, productId: product.id });
  const findCart = cart.find((cartItem) => cartItem.id === cartId);
  const { addCartItem, updateCartListItemQuantity, getCartItemQuantity, deleteCartItem } =
    useRecoilCart();

  const updateCartItemAndSync = async (value: number) => {
    try {
      await updateCartItemQuantityApi({ cartId, quantity: value, serverName });
      updateCartListItemQuantity({ cartId, quantity: value });
    } catch (error) {
      console.error(error);
    }
  };

  const removeCartItemAndDelete = async () => {
    try {
      removeCartItemApi({ cartId, serverName });
      deleteCartItem(cartId);
    } catch (error) {
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
      const cartId = await addItemToCartApi({ productId: product.id, serverName });
      addCartItem({ cartId: Number(cartId), product });
    } catch (error) {
      console.error(error);
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
