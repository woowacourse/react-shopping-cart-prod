import { useNavigate } from 'react-router-dom';

import * as S from './CartButtonWithIcon.style';

import { useCart, useRefreshCart } from '@views/Cart/recoil/cartState';
import { useRefreshProduct } from '@views/Product/recoil/productListState';

function CartButtonWithIcon() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const refreshCart = useRefreshCart();
  const refreshProduct = useRefreshProduct();

  return (
    <S.CartWrapper
      type="button"
      aria-label="장바구니 페이지로 가기"
      role="button"
      onClick={() => {
        refreshCart();
        refreshProduct();
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
