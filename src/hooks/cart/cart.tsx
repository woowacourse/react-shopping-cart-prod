import { ChangeEvent } from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { addToCart, deleteCartItem, updateCartItem } from '../../apis/cart';
import { cartState, selectedItemsSelector } from '../../atoms/cart';
import { DELETE_CART_ITEMS } from '../../constants/cart';
import { CartItem } from '../../types/cart';
import { waitForMutation } from '../../utils/waitFor';
import {
  useRefreshableRecoilState,
  useRefreshableRecoilValue,
} from '../common/useRefreshableAtom';

export const useCartSelector = () => {
  const cart = useRefreshableRecoilValue(cartState);
  const [selectedItems, setSelectedItems] = useRefreshableRecoilState(
    selectedItemsSelector
  );

  const selectItem = (id: CartItem['id']) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = new Set(prevSelectedItems);

      prevSelectedItems.has(id)
        ? updatedSelectedItems.delete(id)
        : updatedSelectedItems.add(id);

      return updatedSelectedItems;
    });
  };

  const handleSelectDeselectAll = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    checked
      ? setSelectedItems(new Set(cart.map(({ id }) => id)))
      : setSelectedItems(new Set());
  };

  return { selectedItems, selectItem, handleSelectDeselectAll };
};

export const useMutateCart = () => {
  const refreshCart = useRecoilRefresher_UNSTABLE(cartState);
  const selectedItems = useRefreshableRecoilValue(selectedItemsSelector);

  const addItemToCartMutation = waitForMutation(addToCart);

  const composedCartItemMutation = async ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    const { headers } = await addItemToCartMutation({ productId: id });
    const cartId = +headers.get('Location')!.replace('/cart-items/', '');

    await updateCartItemMutation({ cartId, quantity });
  };

  const updateCartItemMutation = waitForMutation(updateCartItem, {
    onSuccess() {
      refreshCart();
    },
  });

  const deleteCartItemMutation = waitForMutation(deleteCartItem, {
    onSuccess() {
      refreshCart();
    },
  });

  const deleteSelectedCartItems = async () => {
    if (window.confirm(DELETE_CART_ITEMS))
      await Promise.all(
        [...selectedItems].map((id) => deleteCartItemMutation(id))
      );
  };

  return {
    addItemToCartMutation,
    updateCartItemMutation,
    deleteCartItemMutation,
    deleteSelectedCartItems,
    composedCartItemMutation,
  };
};
