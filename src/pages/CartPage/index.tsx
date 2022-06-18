import PaymentsAmount from 'components/Cart/PaymentsAmount';
import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import CartList from 'components/Cart/CartList';
import RequestFail from 'components/@common/RequestFail';
import { Styled } from './styles';

const CartPage = () => {
  const { data: cartList, error: errorGetCartList } = useAppSelector(
    state => state.cartListReducer
  );
  const dispatch = useAppDispatch<CartListAction>();

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  if (errorGetCartList) return <RequestFail />;

  return (
    <Styled.CartPage>
      <Styled.Header>장바구니</Styled.Header>
      <CartList cartList={cartList} />
      <PaymentsAmount cartList={cartList} />
    </Styled.CartPage>
  );
};

export default CartPage;
