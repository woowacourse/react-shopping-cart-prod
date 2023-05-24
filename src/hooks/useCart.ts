import { useRecoilState, useRecoilValue } from 'recoil';
import { FIRST_INDEX, ONE_ITEM_IN_CART } from '../constants';
import { CART_URL } from '../constants/url';
import { cartState, serverState } from '../recoil';
import { CartItem } from '../types';
import { useFetchData } from './useFetchData';

export const useSetCart = (productId: number) => {
  const [cart, setCart] = useRecoilState(cartState);

  const server = useRecoilValue(serverState);

  const { api } = useFetchData();

  const findCartItemIndex = (prev: CartItem[]) => {
    const cart = [...prev];
    const cartItemIndex = prev.findIndex((item) => item.product.id === productId);
    const alreadyHasCartItem = cartItemIndex >= FIRST_INDEX;

    return { cart, cartItemIndex, alreadyHasCartItem };
  };

  const findCartItemId = () => cart.find((item) => item.product.id === productId)?.id;

  const removeProduct = (cart: CartItem[], cartItemIndex: number) => {
    if (cartItemIndex >= FIRST_INDEX) cart.splice(cartItemIndex, ONE_ITEM_IN_CART);

    return cart;
  };

  const updateCart = (value: number) => {
    const quantity = value;
    const cartItemId = findCartItemId();

    api
      .patch(`${server}${CART_URL}/${cartItemId}`, { quantity })
      .then(() => {
        setCart((prev) => {
          const { cart, cartItemIndex } = findCartItemIndex(prev);

          const updatedItem = { ...prev[cartItemIndex], quantity: Number(value) };
          cart[cartItemIndex] = updatedItem;

          return cart;
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const addToCart = async () => {
    try {
      await api.post(`${server}${CART_URL}`, { productId });
      const newCart = await api.get(`${server}${CART_URL}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      });

      setCart(newCart);
    } catch (error) {
      alert(error);
    }
  };

  const removeItemFromCart = () => {
    const cartItemId = findCartItemId();

    api
      .delete(`${server}${CART_URL}/${cartItemId}`)
      .then(() => {
        setCart((prev) => {
          const { cart, cartItemIndex, alreadyHasCartItem } = findCartItemIndex(prev);

          if (alreadyHasCartItem) return removeProduct(cart, cartItemIndex);

          return prev;
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return { addToCart, removeItemFromCart, updateCart };
};
