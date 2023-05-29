import { styled } from 'styled-components';
import Skeleton from '../Skeleton/Skeleton';

const HeaderFallback = () => {
  return (
    <Container role="status">
      <Logo>
        <Skeleton />
      </Logo>
      <RightContainer>
        <Select>
          <Skeleton />
        </Select>
        <CartButton>
          <Skeleton />
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
  padding: 0 8%;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
`;

const Logo = styled.div`
  width: 136px;
  height: 38px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

const Select = styled.div`
  width: 120px;
  height: 36px;
`;

const CartButton = styled.div`
  width: 35px;
  height: 45px;
`;

export default HeaderFallback;
