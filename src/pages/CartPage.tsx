import styled from 'styled-components';
import PaymentsAmount from 'components/Cart/PaymentsAmount';
import theme from 'styles/theme';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import CartList from 'components/Cart/CartList';
import RequestFail from 'components/common/RequestFail';
import { formatDecimal } from 'utils';

const CartPage = () => {
  const { data: cartList, error: errorGetCartList } = useAppSelector(
    state => state.cartListReducer
  );
  const dispatch = useAppDispatch<CartListAction>();

  const [paymentsAmount, setPaymentsAmount] = useState(0);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  if (errorGetCartList) return <RequestFail />;

  return (
    <Styled.CartPage>
      <Styled.Header>장바구니</Styled.Header>
      <CartList cartList={cartList} setPaymentsAmount={setPaymentsAmount} />
      <PaymentsAmount>{formatDecimal(paymentsAmount)}원</PaymentsAmount>
    </Styled.CartPage>
  );
};

const Styled = {
  CartPage: styled.div`
    display: grid;
    grid-template-areas:
      'hd hd'
      'cl pa';
  `,

  Header: styled.div`
    grid-area: hd;
    text-align: center;
    border-bottom: 4px solid ${theme.colors.lightBlack};
    margin-bottom: 5.3rem;
    padding: 2.9rem;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 3.2rem;
    line-height: 3.7rem;

    text-align: center;
    letter-spacing: 0.5px;
  `,
};

export default CartPage;
