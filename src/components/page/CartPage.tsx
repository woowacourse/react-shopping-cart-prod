import styled from 'styled-components';

import CartItemList from '../cart/CartItemList';
import CartBill from '../cart/CartBill';

export default function CartPage() {
  return (
    <>
      <CartHeader>
        <h2>장바구니</h2>
      </CartHeader>
      <CartMain>
        <CartItemList />
        <CartBillBox>
          <CartBill />
        </CartBillBox>
      </CartMain>
    </>
  );
}

const CartHeader = styled.div`
  width: 100%;
  border-bottom: 4px solid #333333;
  padding-bottom: 28px;

  line-height: 37px;
  letter-spacing: 0.5px;
  font-size: 32px;
  font-weight: 700;
  text-align: center;

  color: #333333;
`;

const CartMain = styled.div`
  display: flex;
  justify-content: space-around;

  width: 100%;

  @media (max-width: 1184px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CartBillBox = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 448px) {
    width: 100%;
  }
`;
