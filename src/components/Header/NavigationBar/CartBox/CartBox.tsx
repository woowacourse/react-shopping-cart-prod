import { useNavigate } from 'react-router-dom';
import NavCartIcon from '../../../../assets/nav-cart.svg';

import { Logo, LogoTitle } from '../NavigationBar.style';
import * as S from './CartBox.style';
import { PAGE_PATH } from '../../../../constants/path';
import { useRecoilValue } from 'recoil';
import { cartCountSelector } from '../../../../recoil/cartAtoms';

function CartBox() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);

  return (
    <S.CartWrapper onClick={() => navigate(PAGE_PATH.CART)}>
      <Logo>
        <S.CartIcon src={NavCartIcon} />
        <LogoTitle>장바구니</LogoTitle>
      </Logo>
      {cartCount > 0 && (
        <S.CartCountWrapper>
          <S.CartCount>{cartCount}</S.CartCount>
        </S.CartCountWrapper>
      )}
    </S.CartWrapper>
  );
}

export default CartBox;
