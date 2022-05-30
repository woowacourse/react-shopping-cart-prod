import * as Styled from './style';
import MenuItem from 'components/Common/MenuItem/MenuItem';
import bigCart from 'assets/svg/bigCart.svg';
import { PATH_NAME } from 'constants';
import { useNavigate } from 'react-router-dom';
import useCart from 'hooks/useCart';

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleClickCartMenu = () => {
    navigate(PATH_NAME.CART);
  };
  return (
    <Styled.Wrapper>
      <Styled.Logo to="/">
        <Styled.LogoImage src={bigCart} alt="로고" />
        <Styled.LogoText>우아한 상회</Styled.LogoText>
      </Styled.Logo>
      <Styled.MenuContainer>
        <MenuItem onClick={handleClickCartMenu}>
          장바구니
          <Styled.Badge>{cartItems?.length ?? 0}</Styled.Badge>
        </MenuItem>
        <MenuItem>주문목록</MenuItem>
      </Styled.MenuContainer>
    </Styled.Wrapper>
  );
};

export default Header;
