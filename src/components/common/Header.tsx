import styled from 'styled-components';
import { ROUTE_PATH } from '../../constants/';
import { useGoToAnotherPage } from '../../hooks/useGoToAnotherPage';
import Cart from '../Cart';
import CartIcon from '../icons/CartIcon';
import Order from '../Order';
import ServerSelector from '../ServerSelector';

const Header = () => {
  const goToPage = useGoToAnotherPage();

  return (
    <StyledHeader>
      <Wrapper>
        <StyledButton onClick={() => goToPage(ROUTE_PATH.MAIN_PAGE)}>
          <CartIcon aria-label="logo-cart-icon" />
          <Title>STORE</Title>
        </StyledButton>
        <ServerSelector />
        <Cart />
        <Order />
      </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 1270px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StyledButton = styled.button`
  color: #fff;
  background: none;
  cursor: pointer;

  @media (max-width: 480px) {
    display: flex;
  }
`;

const Title = styled.span``;

export default Header;
