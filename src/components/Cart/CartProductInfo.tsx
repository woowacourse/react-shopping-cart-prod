import styled from 'styled-components';

import CartProductList from './CartProductList';
import TotalCartProduct from './TotalCartProduct';

import useCartProductCount from '../../hooks/useCartProductCount';

const CartProductInfo = () => {
  const cartProductCount = useCartProductCount();

  return (
    <Container>
      <div>
        <InfoTitle>든든배송 상품 ({cartProductCount}개)</InfoTitle>
        <CartProductList />
        <TotalCartProduct />
      </div>
    </Container>
  );
};

const Container = styled.section`
  max-width: 780px;
  flex-grow: 1;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const InfoTitle = styled.h3`
  height: 90px;
  line-height: 90px;
  font-size: 20px;
  font-weight: 400;
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray400};
`;

export default CartProductInfo;
