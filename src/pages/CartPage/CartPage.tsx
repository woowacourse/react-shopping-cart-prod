import { useEffect } from 'react';

import CartContent from 'components/CartContent/CartContent';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartStoreState } from 'types';
import { isLogin } from 'utils/auth';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

import * as S from './CartPage.styled';

function CartPage() {
  const cart = useSelector(
    (state: { cart: CartStoreState }) => state.cart.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin()) {
      alert(USER_MESSAGE.NEED_LOGIN);
      navigate(PATH.LOGIN, { replace: true });

      return;
    }
  }, [dispatch, navigate]);

  return (
    <S.Page>
      <h2>장바구니</h2>
      <hr />
      <CartContent cartItems={cart} />
    </S.Page>
  );
}

export default CartPage;
