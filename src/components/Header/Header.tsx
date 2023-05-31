import titleLogo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../style/style';
import * as S from './Header.style';
import { useRecoilValue } from 'recoil';
import { cartCountSelector } from '../../recoil/cartAtoms';
import ServerSelectBox from './ServerSelectBox/ServerSelectBox.tsx';
import UserSelector from './UserSelector/UserSelector.tsx';
import { PAGE_PATH } from '../../constants/path.ts';

function Header() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);

  return (
    <S.HeaderWrapper>
      <Container>
        <S.HeaderContent>
          <S.LogoWrapper onClick={() => navigate(PAGE_PATH.HOME)}>
            <S.LogoImage src={titleLogo} />
          </S.LogoWrapper>
          <S.NavBar>
            <ServerSelectBox />
            <S.CartWrapper onClick={() => navigate(PAGE_PATH.CART)}>
              <S.CartTitle>장바구니</S.CartTitle>
              <S.CartCountWrapper>
                <S.CartCount>{cartCount}</S.CartCount>
              </S.CartCountWrapper>
            </S.CartWrapper>
            <S.OrderListButton onClick={() => navigate(PAGE_PATH.ORDER)}>주문목록</S.OrderListButton>
            <UserSelector />
          </S.NavBar>
        </S.HeaderContent>
      </Container>
    </S.HeaderWrapper>
  );
}

export default Header;
