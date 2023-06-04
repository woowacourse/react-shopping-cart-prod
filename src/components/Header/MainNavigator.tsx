import { styled } from 'styled-components';
import { ROUTE_PATH } from '../../constants';
import { useGoToAnotherPage } from '../../hooks/useGoToAnotherPage';
import CartIcon from '../icons/CartIcon';

const MainNavigator = () => {
  const goToPage = useGoToAnotherPage();

  return (
    <Item>
      <StyledButton onClick={() => goToPage(ROUTE_PATH.MAIN_PAGE)}>
        <CartIcon aria-label="logo-cart-icon" />
        <Title>STORE</Title>
      </StyledButton>
    </Item>
  );
};

const Item = styled.li``;

const StyledButton = styled.button`
  color: #fff;
  background: none;
  cursor: pointer;

  @media (max-width: 480px) {
    display: flex;
  }
`;

const Title = styled.span``;

export default MainNavigator;
