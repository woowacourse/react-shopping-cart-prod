import styled from 'styled-components';
import CartNavigator from './CartNavigator';
import MainNavigator from './MainNavigator';
import OrderNavigator from './OrderNavigator';
import ServerSelector from './ServerSelector';

const Header = () => {
  return (
    <StyledHeader>
      <Navigator>
        <NavList>
          <MainNavigator />
          <ServerSelector />
          <CartNavigator />
          <OrderNavigator />
        </NavList>
      </Navigator>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  margin-bottom: 62px;
  background: var(--text-color);
  font-size: 34px;
  font-weight: 900;
  line-height: 80px;
  letter-spacing: 0.2px;

  & svg {
    width: 44px;
    height: 36px;
    margin-right: 20px;
    fill: #fff;
  }

  @media (max-width: 768px) {
    font-size: 28px;

    & svg {
      width: 40px;
      margin-right: 16px;
    }
  }

  @media (max-width: 480px) {
    font-size: 24px;

    & svg {
      align-self: center;
      width: 34px;
      margin-right: 8px;
      padding: 2px;
    }
  }
`;

const Navigator = styled.nav``;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 1270px;
  margin: 0 auto;
  padding: 0 20px;
`;

export default Header;
