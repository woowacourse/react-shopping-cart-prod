import { useNavigate } from 'react-router-dom';
import { useRefreshCartList } from '@recoil/cart/cartState';
import logoImage from '@assets/logo.svg';
import shopImage from '@assets/shop.svg';
import * as S from './Logo.style';

function Logo() {
  const navigate = useNavigate();
  const refresher = useRefreshCartList();

  return (
    <S.LogoWrapper
      type="button"
      aria-label="SHOP 홈페이지로 가기"
      role="button"
      onClick={() => {
        refresher();
        navigate('/');
      }}
    >
      <S.LogoContainer>
        <img src={logoImage} alt="로고 이미지"></img>
      </S.LogoContainer>

      <img src={shopImage} alt="로고 이미지"></img>
    </S.LogoWrapper>
  );
}

export default Logo;
