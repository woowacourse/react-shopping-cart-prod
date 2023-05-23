import CartBadge from '@Components/CartBadge';

import Logo from '@Asset/Logo.png';

import * as S from './style';

function LoadingHeader() {
  return (
    <S.Container aria-label="페이지 헤더">
      <S.Layout>
        <S.LogoWrapper>
          <S.LogoImg src={Logo} alt="장바구니 로고" />
          <S.LogoText>SHOP</S.LogoText>
        </S.LogoWrapper>
        <CartBadge cartItemsAmount="0" />
      </S.Layout>
    </S.Container>
  );
}

export default LoadingHeader;
