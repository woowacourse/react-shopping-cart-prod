import { useEffect } from 'react';

import CartContent from 'components/CartContent/CartContent';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CartStoreState } from 'types/index';
import { isLogin } from 'utils/auth';

import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

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
    <StyledPage>
      <h2>장바구니</h2>
      <hr />
      <CartContent cartItems={cart} />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 800px;
  margin: 50px auto;

  h2 {
    margin-bottom: 20px;

    font-size: 20px;
    font-weight: 900;
  }

  hr {
    width: 100%;
  }
`;

export default CartPage;
