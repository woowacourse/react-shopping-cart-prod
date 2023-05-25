import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { CartItemType, Servers, UpdateCartItem } from '@Types/index';

import { fetchData } from '@Utils/api';

import cartItemsState from '@Atoms/cartItemsState';
import serverState from '@Atoms/serverState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

const useCartItems = () => {
  const server = useRecoilValue(serverState);
  const [cartItems, setCartItems] = useRecoilState<CartItemType[]>(cartItemsState);

  const [updateStats, setUpdateStats] = useState<'success' | 'loading'>('success');

  const isEmpty = cartItems ? !cartItems.length : 0;

  const isSelected = (id: number) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === id);
    if (!cartItem) return false;

    return cartItem.isSelected;
  };

  const toggleServer = async (server: Servers) => {
    const data = await fetchData<CartItemType[]>({ url: FETCH_URL.cartItems, method: FETCH_METHOD.GET, server });
    setCartItems(data);
  };

  const updateCartItem: UpdateCartItem = async (url, method, body) => {
    if (updateStats === 'loading') return;

    await fetchData<{ ok: boolean }>({ url, method, body, server });

    setUpdateStats('loading');
    const data = await fetchData<CartItemType[]>({ url: FETCH_URL.cartItems, method: FETCH_METHOD.GET, server });

    const newCartItems = data.map((cartItem) => {
      return {
        ...cartItem,
        isSelected: isSelected(cartItem.id),
      };
    });

    setUpdateStats('success');

    setCartItems(newCartItems);
  };

  const toggleSelected = (id: number) => {
    if (!cartItems) return;

    const index = cartItems.findIndex((cartItem) => cartItem.id === id);
    const newCartItem = { ...cartItems[index], isSelected: !isSelected(id) };

    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1, newCartItem);

    setCartItems(newCartItems);
  };

  const toggleAllSelected = () => {
    if (!cartItems) return;

    const isAllSelected = cartItems.every((cartItem) => cartItem.isSelected);

    setCartItems(
      cartItems.map((cartItem) => {
        return { ...cartItem, isSelected: !isAllSelected };
      }),
    );
  };

  const deleteSelectedCartItem = (id: number) => {
    if (!cartItems) return;

    updateCartItem(`${FETCH_URL.cartItems}/${id}`, FETCH_METHOD.DELETE);

    setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
  };

  const deleteAllSelectedCartItem = () => {
    if (!cartItems) return;

    cartItems.forEach((cartItem) => {
      if (!cartItem.isSelected) return;
      updateCartItem(`${FETCH_URL.cartItems}/${cartItem.id}`, FETCH_METHOD.DELETE);
    });

    setCartItems(cartItems.filter((cartItem) => !cartItem.isSelected));
  };

  return {
    isEmpty,
    toggleServer,
    updateCartItem,
    toggleSelected,
    toggleAllSelected,
    deleteSelectedCartItem,
    deleteAllSelectedCartItem,
  };
};

export default useCartItems;
