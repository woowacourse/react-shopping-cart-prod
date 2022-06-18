import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';

export const useCart = () => {
  const { data: cartList, error: errorGetCartList } = useAppSelector(
    state => state.cartListReducer
  );
  const dispatch = useAppDispatch<CartListAction>();

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  return { cartList, errorGetCartList };
};
