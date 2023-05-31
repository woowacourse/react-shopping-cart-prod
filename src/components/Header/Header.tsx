import bigTitleLogo from '../../assets/logo.png';
import smallTitleLogo from '../../assets/small-logo.png';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../style/style';
import * as S from './Header.style';
import { useRecoilValue } from 'recoil';
import { cartCountSelector } from '../../recoil/cartAtoms';
import ServerSelectBox from './ServerSelectBox/ServerSelectBox.tsx';
import UserSelector from '../UserSelector/UserSelector.tsx';
import { PAGE_PATH } from '../../constants/path.ts';
import NavCartIcon from '../../assets/nav-cart.svg';
import NavOrderListIcon from '../../assets/list.svg';

function Header() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);

  return (
    <S.HeaderWrapper>
      <Container>
        <S.HeaderContent>
          <S.LogoWrapper onClick={() => navigate(PAGE_PATH.HOME)}>
            <S.BigLogoImage src={bigTitleLogo} />
            <S.SmallLogoImage src={smallTitleLogo} />
          </S.LogoWrapper>
          <S.NavBar>
            <ServerSelectBox />
            <S.CartWrapper onClick={() => navigate(PAGE_PATH.CART)}>
              <S.Logo>
                <S.CartIcon src={NavCartIcon} />
                <S.LogoTitle>장바구니</S.LogoTitle>
              </S.Logo>
              {cartCount !== 0 && (
                <S.CartCountWrapper>
                  <S.CartCount>{cartCount}</S.CartCount>
                </S.CartCountWrapper>
              )}
            </S.CartWrapper>
            <S.OrderListButton onClick={() => navigate(PAGE_PATH.ORDER)}>
              <S.Logo>
                <S.OrderListIcon src={NavOrderListIcon} />
                <S.LogoTitle>주문목록</S.LogoTitle>
              </S.Logo>
            </S.OrderListButton>
            <UserSelector />
          </S.NavBar>
        </S.HeaderContent>
      </Container>
    </S.HeaderWrapper>
  );
}

export default Header;
