import axios from 'axios';
import { SERVER_URL } from 'configs/api';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'types';

import { actions } from 'redux/actions';

type SelectedState = StoreState['cartState'];

const useCart = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const { isLoading, error, cart } = useSelector<StoreState, SelectedState>(
    ({ cartState }) => ({
      isLoading: cartState.isLoading,
      error: cartState.error,
      cart: cartState.cart,
    })
  );
  const [checkedFlags, setCheckedFlags] = useState<Record<string, boolean>>({});
  const totalPrice = useMemo(
    () =>
      cart
        .filter(({ cartItemId }) => checkedFlags[cartItemId] ?? true)
        .reduce(
          (totalPrice, { product, quantity }) =>
            totalPrice + product.price * Number(quantity),
          0
        ),
    [cart, checkedFlags]
  );

  const handleChangeQuantity =
    (cartItemId: number, productId: number) => async (quantity: number) => {
      await axios({
        method: 'put',
        url: `${SERVER_URL}/api/customers/cart/${cartItemId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          productId,
          quantity,
        },
      });

      dispatch(actions.getCart(accessToken as string));
    };

  const handleCheck =
    (cartItemId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedFlags((prev) => ({ ...prev, [cartItemId]: e.target.checked }));
    };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFlags((prev) => {
      const updated = {} as Record<string, boolean>;

      cart.forEach(({ cartItemId }) => {
        updated[cartItemId] = e.target.checked;
      });

      return updated;
    });
  };

  const removeCartItem = (cartItemId: number) => async () => {
    await axios({
      method: 'delete',
      url: `${SERVER_URL}/api/customers/cart/${cartItemId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(actions.getCart(accessToken as string));
  };

  const removeAllCartItem = async () => {
    const checkedList = Object.entries(checkedFlags).filter(
      ([_, checked]) => checked
    );

    const urlList = checkedList.map(
      ([cartItemId]) => `${SERVER_URL}/api/customers/cart/${cartItemId}`
    );

    const fetchURL = (url: string) =>
      axios({
        method: 'delete',
        url,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

    const promiseList = urlList.map(fetchURL);

    await Promise.all(promiseList);
    dispatch(actions.getCart(accessToken as string));
  };

  useEffect(() => {
    dispatch(actions.getCart(accessToken as string));
  }, [dispatch]);

  return {
    isLoading,
    error,
    cart,
    checkedFlags,
    totalPrice,
    handleChangeQuantity,
    handleCheck,
    handleCheckAll,
    removeCartItem,
    removeAllCartItem,
  };
};

export default useCart;
