import { useRecoilState, useRecoilValue } from 'recoil';
import { FIRST_INDEX } from '../constants';
import { QUANTITY } from '../constants';
import { CART_URL } from '../constants/url';
import { cartState, productSelector, serverState } from '../recoil';
import { CartItem } from '../types';
import { useFetchData } from './useFetchData';

export const useSetCart = (productId?: number) => {
  const [cart, setCart] = useRecoilState(cartState);
  const selectedProduct = useRecoilValue(productSelector(productId));

  const server = useRecoilValue(serverState);

  const { api } = useFetchData();

  const findCartItemIndex = (prev: CartItem[]) => {
    const cart = [...prev];
    const cartItemIndex = prev.findIndex((item) => item.product.id === productId);
    const alreadyHasCartItem = cartItemIndex >= FIRST_INDEX;

    return { cart, cartItemIndex, alreadyHasCartItem };
  };

  const findCartItemId = () => cart.find((item) => item.product.id === productId)?.id;

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
      const response = await api.post(`${server}${CART_URL}`, { productId });
      const location = response.headers.get('location');
      const cartId = location.replace(`${CART_URL}/`, '');

      if (!selectedProduct) return;

      setCart((prev) => [
        ...prev,
        {
          id: Number(cartId),
          quantity: QUANTITY.INITIAL,
          product: selectedProduct,
        },
      ]);
    } catch (error) {
      alert(error);
    }
  };

  const removeItemFromCart = (checkedItemIdList?: number[]) => {
    const cartItemIdList = checkedItemIdList ? checkedItemIdList : [findCartItemId()];

    api
      .delete(`${server}${CART_URL}`, { cartItemIdList })
      .then(() => {
        setCart((prev) =>
          prev.filter(
            (item) => !cartItemIdList.includes(checkedItemIdList ? item.id : item.product.id)
          )
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return { addToCart, removeItemFromCart, updateCart };
};
