import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import cartState, { useRefreshCartList } from '@recoil/cart/cartState';
import * as S from './CartStepperWithIcon.style';

function CartStepperWithIcon() {
  const cart = useRecoilValue(cartState);
  const navigate = useNavigate();
  const refresher = useRefreshCartList();

  return (
    <S.CartWrapper
      type="button"
      aria-label="장바구니 페이지로 가기"
      role="button"
      onClick={() => {
        refresher();
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

export default CartStepperWithIcon;
