import * as Styled from './style';
import MenuItem from 'components/Common/MenuItem/MenuItem';
import bigCart from 'assets/svg/bigCart.svg';
import { PATH_NAME } from 'constants';
import { Link } from 'react-router-dom';
import useCart from 'hooks/useCart';

const Header = () => {
  const { cartItems } = useCart();
  return (
    <Styled.Wrapper>
      <Styled.Logo to="/">
        <Styled.LogoImage src={bigCart} alt="로고" />
        <Styled.LogoText>우아한 상회</Styled.LogoText>
      </Styled.Logo>
      <Styled.MenuContainer>
        <MenuItem>
          <Link to={PATH_NAME.CART}>장바구니</Link>
          <Styled.Badge>{cartItems?.length ?? 0}</Styled.Badge>
        </MenuItem>
        <MenuItem>주문목록</MenuItem>
        <MenuItem>
          <Link to={PATH_NAME.LOGIN}>로그인</Link>
        </MenuItem>
        <MenuItem>
          <Link to={PATH_NAME.SIGN_UP}>회원가입</Link>
        </MenuItem>
      </Styled.MenuContainer>
    </Styled.Wrapper>
  );
};

export default Header;
