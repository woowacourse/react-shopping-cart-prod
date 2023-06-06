import styled from 'styled-components';

import CartProductList from './CartProductList';
import TotalCartProduct from './TotalCartProduct';

import useCartProductCount from '../../hooks/useCartProductCount';

const CartProductInfo = () => {
  const cartProductCount = useCartProductCount();

  return (
    <Container>
      <InfoTitle>든든배송 상품 ({cartProductCount}개)</InfoTitle>
      <CartProductList />
      <TotalCartProduct />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InfoTitle = styled.h3`
  height: 90px;

  border-bottom: 4px solid ${({ theme }) => theme.colors.gray400};
  line-height: 90px;
  font-size: 20px;
  font-weight: 600;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    height: 32px;
    line-height: 32px;
  }
`;

export default CartProductInfo;
