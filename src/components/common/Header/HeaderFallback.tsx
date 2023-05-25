import { styled } from 'styled-components';
import Skeleton from '../Skeleton/Skeleton';
import { CartIcon } from '../../../assets/svg';

const HeaderFallback = () => {
  return (
    <Container role="status">
      <Logo>
        <CartIcon />
        <Title>SHOP</Title>
      </Logo>
      <RightContainer>
        <Select>
          <Skeleton type="dark" />
        </Select>
        <CartButton>
          <Skeleton type="dark" />
        </CartButton>
      </RightContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 0 10%;
  background-color: #333;
  color: #fff;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  padding-top: 8px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 24px;
`;

const Select = styled.div`
  width: 102px;
  height: 42px;
`;

const CartButton = styled.div`
  width: 115px;
  height: 29px;
`;

export default HeaderFallback;
