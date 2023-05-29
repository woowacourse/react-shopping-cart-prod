import titleLogo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../style/style';
import {
  CartCount,
  CartCountWrapper,
  CartTitle,
  NavBar,
  HeaderContent,
  LogoImage,
  LogoWrapper,
  HeaderWrapper,
  CartWrapper,
  OrderListButton,
} from './Header.style';
import { useRecoilValue } from 'recoil';
import { cartCountSelector } from '../../recoil/cartAtoms';
import ServerSelectBox from '../ServerSelectBox/ServerSelectBox.tsx';
import UserSelector from '../UserSelector/UserSelector.tsx';

function Header() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <LogoWrapper onClick={() => navigate('/')}>
            <LogoImage src={titleLogo} />
          </LogoWrapper>
          <NavBar>
            <ServerSelectBox />
            <CartWrapper onClick={() => navigate('/cart')}>
              <CartTitle>장바구니</CartTitle>
              <CartCountWrapper>
                <CartCount>{cartCount}</CartCount>
              </CartCountWrapper>
            </CartWrapper>
            <OrderListButton onClick={() => navigate('/order')}>
              주문목록
            </OrderListButton>
            <UserSelector />
          </NavBar>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
}

export default Header;
