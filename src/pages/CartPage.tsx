import styled from 'styled-components';
import PaymentsAmount from 'components/Cart/PaymentsAmount';
import theme from 'styles/theme';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useFetch } from 'hooks/useFetch';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import { LOCAL_BASE_URL } from 'apis';
import { Item } from 'types/domain';
import CartList from 'components/Cart/CartList';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';
import { Payments } from '@compy-ryu/payments';
import Modal from 'components/common/Snackbar';

const CartPage = () => {
  const {
    data: cartList,
    error: errorGetCartList,
    loading: loadingGetCartList,
  } = useAppSelector(state => state.cartListReducer);

  const dispatch = useAppDispatch<CartListAction>();
  const [paymentsAmount, setpaymentsAmount] = useState(0);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  if (loadingGetCartList) return <Loading></Loading>;
  if (errorGetCartList) return <RequestFail />;

  return (
    <>
      <StyledRoot>
        <StyledHeader>장바구니</StyledHeader>
        <CartList cartList={cartList} setPaymentsAmount={setpaymentsAmount}>
          {loadingGetCartList && <Loading></Loading>}
        </CartList>
        <PaymentsAmount>{paymentsAmount}원</PaymentsAmount>
      </StyledRoot>
    </>
  );
};

const StyledRoot = styled.div`
  display: grid;
  grid-template-areas:
    'hd hd'
    'cl pa';
`;

const StyledHeader = styled.div`
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
`;

export default CartPage;
