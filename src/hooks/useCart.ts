import { useRecoilState } from 'recoil';
import { cartListAtom } from '../stores/cartListStore.ts';
import { ItemWithSelected } from '../types/CartList.ts';
import { useCallback } from 'react';

const useCart = () => {
  const [cartList, setCartList] = useRecoilState(cartListAtom);

  const removeCartItem = useCallback(
    (itemId: number) => {
      if (!cartList) {
        return;
      }

      const updatedItems = cartList.filter((item) => item.id !== itemId);

      setCartList(updatedItems);
    },
    [cartList, setCartList]
  );

  const updateCart = useCallback(
    (cartItem: ItemWithSelected) => {
      // If there's no cart, add the cartItem to the cart
      if (!cartList) {
        setCartList([cartItem]);
        return;
      }

      // Check if the item exists in the cart
      const itemExists = cartList.some((item) => item.id === cartItem.id);

      // If item exists and its quantity is 0, remove the item from the cart
      if (cartItem.quantity === 0) {
        setCartList(cartList.filter((item) => item.id !== cartItem.id));
        return;
      }

      // If item exists and its quantity is not 0, update the item
      if (itemExists && cartItem.quantity !== 0) {
        setCartList([...cartList.filter((item) => item.id !== cartItem.id), cartItem]);
        return;
      }

      // If item does not exist, add it to the cart
      if (!itemExists) {
        setCartList([...cartList, cartItem]);
        return;
      }
    },
    [cartList]
  );

  const toggleIsSelected = useCallback(
    (itemId: number) => {
      if (!cartList) {
        return;
      }

      const updatedItems = cartList.map((item: ItemWithSelected) => {
        if (item.id !== itemId) {
          return item;
        }

        return {
          ...item,
          isSelected: !item.isSelected,
        };
      });

      setCartList([...updatedItems]);
    },
    [cartList, setCartList]
  );

  const selectAllItems = useCallback(() => {
    if (!cartList) {
      return;
    }

    const updatedItems = cartList.map((item) => {
      return {
        ...item,
        isSelected: true,
      };
    });

    setCartList([...updatedItems]);
  }, [cartList, setCartList]);

  const removeCartsWithId = useCallback(
    (items: number[]) => {
      if (!cartList) {
        return;
      }

      const updatedItems = cartList.filter((item) => !items.includes(item.id));

      setCartList([...updatedItems]);
    },
    [cartList, setCartList]
  );

  return { cartList, setCartList, updateCart, removeCartItem, toggleIsSelected, selectAllItems, removeCartsWithId };
};

export default useCart;
