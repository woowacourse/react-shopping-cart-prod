import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'redux/actions';
import { CartItem, StoreState } from 'types';

type SelectedState = StoreState['cartState'];

const useCart = () => {
  const dispatch = useDispatch();
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
            totalPrice + product.price * quantity,
          0
        ),
    [cart, checkedFlags]
  );

  const handleChangeQuantity =
    ({ cartItemId, product }: CartItem) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const quantity = e.target.valueAsNumber;

      if (!Number.isNaN(quantity)) {
        dispatch(actions.updateQuantity(cartItemId, product.id, quantity));
      }
    };

  const handleCheck =
    ({ cartItemId }: CartItem) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeCartItem =
    ({ cartItemId }: CartItem) =>
    () => {
      dispatch(actions.removeCartItem(cartItemId));
    };

  const removeAllCartItem = () => {
    cart
      .filter(({ cartItemId }) => checkedFlags[cartItemId])
      .forEach(({ cartItemId }) => {
        dispatch(actions.removeCartItem(cartItemId));
      });
  };

  useEffect(() => {
    dispatch(actions.getCart());
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
