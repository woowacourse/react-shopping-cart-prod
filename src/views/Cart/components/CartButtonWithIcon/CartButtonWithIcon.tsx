import { useNavigate } from 'react-router-dom';

import * as S from './CartButtonWithIcon.style';

import { useCart, useResetCart } from '@views/Cart/recoil/cartState';

function CartButtonWithIcon() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const resetCart = useResetCart();

  return (
    <S.CartWrapper
      type="button"
      aria-label="장바구니 페이지로 가기"
      role="button"
      onClick={() => {
        resetCart();
        navigate('/cart');
      }}
    >
      <S.CartTitle>
        <S.CartText>장바구니</S.CartText>
      </S.CartTitle>
      <S.CartCountWrapper>
        <S.CartCount aria-live="polite">{cart.length}</S.CartCount>
      </S.CartCountWrapper>
    </S.CartWrapper>
  );
}

export default CartButtonWithIcon;
