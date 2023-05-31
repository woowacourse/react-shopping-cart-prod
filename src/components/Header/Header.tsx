import titleLogo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../style/style';
import * as S from './Header.style';
import { useRecoilValue } from 'recoil';
import { cartCountSelector } from '../../recoil/cartAtoms';
import ServerSelectBox from './ServerSelectBox/ServerSelectBox.tsx';
import UserSelector from './UserSelector/UserSelector.tsx';

function Header() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);

  return (
    <S.HeaderWrapper>
      <Container>
        <S.HeaderContent>
          <S.LogoWrapper onClick={() => navigate('/')}>
            <S.LogoImage src={titleLogo} />
          </S.LogoWrapper>
          <S.NavBar>
            <ServerSelectBox />
            <S.CartWrapper onClick={() => navigate('/cart')}>
              <S.CartTitle>장바구니</S.CartTitle>
              <S.CartCountWrapper>
                <S.CartCount>{cartCount}</S.CartCount>
              </S.CartCountWrapper>
            </S.CartWrapper>
            <S.OrderListButton onClick={() => navigate('/order')}>주문목록</S.OrderListButton>
            <UserSelector />
          </S.NavBar>
        </S.HeaderContent>
      </Container>
    </S.HeaderWrapper>
  );
}

export default Header;
