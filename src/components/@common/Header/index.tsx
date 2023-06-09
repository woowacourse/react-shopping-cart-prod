import Svg from 'components/@common/Svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { countCartListSelector } from 'recoil/carts';
import { ROUTES } from 'utils/constants';
import SelectServer from './SelectServer';
import * as S from './Header.styles';
import { Suspense } from 'react';

const Header = () => {
  const cartCount = useRecoilValue(countCartListSelector);
  const moveTo = useNavigate();

  const onLogoClick = () => {
    moveTo(ROUTES.PRODUCT_LIST);
  };

  const onNavigateToCart = () => {
    moveTo(ROUTES.CART_LIST);
  };

  return (
    <S.HeaderContainer>
      <S.HeaderContentContainer>
        <S.HeaderWrapper gap={20}>
          <S.Logo onClick={onLogoClick}>SHOP</S.Logo>
          <S.LogoIcon onClick={onLogoClick} />
        </S.HeaderWrapper>
        <S.HeaderWrapper gap={8}>
          <SelectServer />
          <S.CartRouteButton
            title="장바구니 페이지로 이동"
            onClick={onNavigateToCart}
          >
            <Svg type="cart-icon" width={25} height={22} />
          </S.CartRouteButton>
          <Suspense fallback={null}>
            <S.CartCounter>{cartCount}</S.CartCounter>
          </Suspense>
          <S.LinkToOrderList to={ROUTES.ORDERED_LIST}>
            주문 목록
          </S.LinkToOrderList>
        </S.HeaderWrapper>
      </S.HeaderContentContainer>
    </S.HeaderContainer>
  );
};

export default Header;
