import { useRecoilValue, useSetRecoilState } from 'recoil';
import { baseURLSelector } from '../store/server';
import { AUTH } from '../constants/auth';
import { useCallback } from 'react';
import { cartAtom } from '../store/cart';
import { Cart } from '../types/responseData';
import { FetchMethod } from '../types/global';

const useFetchCart = () => {
  const baseURL = useRecoilValue(baseURLSelector);
  const setCartList = useSetRecoilState(cartAtom);

  const handleCartItems = useCallback(
    async (method: FetchMethod, body: {}, id?: number) => {
      const response = await fetch(
        `${baseURL}/cart-items${id ? `/${id}` : ''}`,
        {
          method,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            authorization: `Basic ${AUTH}`,
          },
        }
      );

      if (!response.ok) throw new Error(`error code : ${response.status}`);

      const data = await response.text();
      if (!data) return null;
      return JSON.parse(data);
    },
    [baseURL]
  );

  const addToCart = async (productId: number) => {
    try {
      const data = await handleCartItems('POST', { productId });
      const { id, quantity, product } = data;

      setCartList((cartList) => [...cartList, { id, quantity, product }]);
    } catch (error) {
      alert(error);
    }
  };

  const updateCartItem = async (id: number, quantity: number) => {
    try {
      handleCartItems('PATCH', { quantity }, id);
      setCartList(
        (cartList) =>
          [
            ...cartList.map((cart) => {
              if (cart.id === id) return { ...cart, quantity };
              return cart;
            }),
          ] as Cart[]
      );
    } catch (error) {
      alert(error);
    }
  };

  const deleteCartItem = async (id: number) => {
    try {
      handleCartItems('DELETE', {}, id);
      setCartList((cartList) => [...cartList.filter((item) => item.id !== id)]);
    } catch (error) {
      alert(error);
    }
  };

  return { addToCart, updateCartItem, deleteCartItem };
};

export default useFetchCart;
