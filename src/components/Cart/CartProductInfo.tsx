import styled from 'styled-components';

import CartProductList from './CartProductList';
import TotalCartProduct from './TotalCartProduct';

import { useCartProductCount } from '../../hooks/cart';

const CartProductInfo = () => {
  const cartProductCount = useCartProductCount();

  return (
    <div>
      <InfoTitle>든든배송 상품 ({cartProductCount}개)</InfoTitle>
      <CartProductList />
      <TotalCartProduct />
    </div>
  );
};

const InfoTitle = styled.h3`
  height: 75px;
  line-height: 75px;
  font-size: 18px;
  font-weight: 400;
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray400};
`;

export default CartProductInfo;
