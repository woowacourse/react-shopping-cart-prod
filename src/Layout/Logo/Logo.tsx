import { useNavigate } from 'react-router-dom';

import * as S from './Logo.style';

import logoImage from '@assets/logo.svg';
import shopImage from '@assets/shop.svg';

import { useRefreshCart } from '../../views/Cart/recoil/cartState';

function Logo() {
  const navigate = useNavigate();
  const resetCart = useRefreshCart();

  return (
    <S.LogoWrapper
      type="button"
      aria-label="SHOP 홈페이지로 가기"
      role="button"
      onClick={() => {
        resetCart();

        navigate('/');
      }}
    >
      <S.LogoContainer>
        <img src={logoImage}></img>
      </S.LogoContainer>

      <img src={shopImage}></img>
    </S.LogoWrapper>
  );
}

export default Logo;
