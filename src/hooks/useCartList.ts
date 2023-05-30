import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { USER_TOKEN } from '../constants';
import { cartListState } from '../store/cart';
import { originState } from '../store/origin';
import { CartItemType, ProductItemType } from '../types';

const useCartList = () => {
  const [cartItem, setCartItemList] = useRecoilState(cartListState);
  const origin = useRecoilValue(originState);

  const fetchCartList = useCallback(async () => {
    const response = await fetch(`${origin}/cart-items`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_TOKEN}`,
      },
    });
    const cartItems = await response.json();
    const result = cartItems.map((item: CartItemType) => {
      return {
        ...item,
        isChecked: true,
      };
    });
    setCartItemList(result);
    return result;
  }, [origin, setCartItemList]);

  const removeCheckedItems = useCallback(async () => {
    cartItem.forEach(async (item) => {
      if (item.isChecked === true) {
        await fetch(`${origin}/cart-items/${item.id}`, { method: 'DELETE' });
      }
    });

    const updatedCartItems = cartItem.filter((item) => !item.isChecked);
    setCartItemList(updatedCartItems);
  }, [cartItem, setCartItemList, origin]);

  const removeSelectedItem = useCallback(
    async (itemId: number) => {
      await fetch(`${origin}/cart-items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${USER_TOKEN}`,
        },
      });

      const updatedCartItems = cartItem.filter((item) => item.id !== itemId);
      setCartItemList(updatedCartItems);
    },
    [cartItem, setCartItemList, origin]
  );

  const getCheckedList = () => {
    return cartItem.filter((item: CartItemType) => item.isChecked);
  };

  const resetCartCheckStatusToTrue = () => {
    setCartItemList(
      cartItem.map((item) => {
        return {
          ...item,
          isChecked: true,
        };
      })
    );
  };

  const resetCartCheckStatusToFalse = () => {
    setCartItemList(
      cartItem.map((item) => {
        return {
          ...item,
          isChecked: false,
        };
      })
    );
  };

  const reverseCheckCartItem = (cartId: number) => {
    setCartItemList(
      cartItem.map((item) => {
        if (cartId === item.id) {
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        }
        return item;
      })
    );
  };

  const getCartItemSum = () => {
    return cartItem.reduce((acc, item) => {
      if (item.isChecked) return acc + item.quantity * item.product.price;
      return acc;
    }, 0);
  };

  const fetchProductAddToCart = useCallback(
    async (information: ProductItemType, itemQuantity: number) => {
      const response = await fetch(`${origin}/cart-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${USER_TOKEN}`,
        },
      });

      if (response.ok) {
        const isExistItem = cartItem.find((item) => item.product.id === information.id);
        if (isExistItem) {
          const newCartItem = cartItem.map((item) => {
            if (item.product.id === information.id) {
              return {
                ...item,
                quantity: item.quantity + itemQuantity,
              };
            }
            return item;
          });
          setCartItemList(newCartItem);
        } else {
          const newCartItem = [
            ...cartItem,
            {
              id: Number(new Date()),
              product: information,
              quantity: itemQuantity,
              isChecked: true,
            },
          ];
          setCartItemList(newCartItem);
        }
      }
    },
    [cartItem, setCartItemList, origin]
  );

  const updateCartItemQuantity = async (itemId: number, updateQuantity: number) => {
    const response = await fetch(`${origin}/cart-items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        quantity: updateQuantity,
      }),
    });

    if (response.ok) {
      const newItemData = cartItem.map((item: CartItemType) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: updateQuantity,
          };
        }
        return item;
      });
      setCartItemList(newItemData);
    }
  };

  return {
    fetchCartList,
    removeCheckedItems,
    removeSelectedItem,
    getCheckedList,
    resetCartCheckStatusToTrue,
    resetCartCheckStatusToFalse,
    reverseCheckCartItem,
    getCartItemSum,
    fetchProductAddToCart,
    updateCartItemQuantity,
  };
};

export default useCartList;
