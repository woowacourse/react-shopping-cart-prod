import Logo from '../../assets/Logo.png';
import * as Styled from './Header.styles';
import ShoppingCartStatus from './ShoppingCartStatus/ShoppingCartStatus.tsx';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import routes from '../../constants/routes.ts';

const Header = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(routes.list);
  };

  const handleShoppingCartButtonClick = () => {
    navigate(routes.cart);
  };

  return (
    <Styled.HeaderContainer>
      <Styled.HeaderWrapper>
        <Styled.LogoButton data-cy='headerlogo' onClick={handleLogoClick}>
          <Styled.LogoImage src={Logo} alt='SHOP' />
        </Styled.LogoButton>
        <Styled.ShoppingCartButton onClick={handleShoppingCartButtonClick}>
          <Styled.ShoppingCartButtonText>장바구니</Styled.ShoppingCartButtonText>
          <ShoppingCartStatus />
        </Styled.ShoppingCartButton>
      </Styled.HeaderWrapper>
    </Styled.HeaderContainer>
  );
};

export default memo(Header);
