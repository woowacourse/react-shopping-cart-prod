import styled from 'styled-components';

import CartItemList from '../cart/CartItemList';
import CartBill from '../cart/CartBill';
import { useRecoilValue } from 'recoil';
import { cartCountState } from '../../recoil/state';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const cartCount = useRecoilValue(cartCountState);

  return (
    <>
      <CartHeader>
        <h2>장바구니</h2>
      </CartHeader>
      {cartCount !== 0 ? (
        <CartMain>
          <CartItemList />
          <CartBillBox>
            <CartBill />
          </CartBillBox>
        </CartMain>
      ) : (
        <EmptyCartMain>
          <Image src="./shoppingBag.svg" />
          <Message>장바구니에 상품이 없습니다.</Message>
          <Message>상품을 추가해보세요.</Message>
          <StyledLink to="/">상품 담으러 가기</StyledLink>
        </EmptyCartMain>
      )}
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

const EmptyCartMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  margin-top: 64px;
  margin-bottom: 36px;
`;

const Message = styled.p`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.4);

  margin-top: 16px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 224px;
  height: 52px;
  margin: 64px 0;
  border-radius: 8px;

  background-color: #04c09e;

  font-size: 20px;
  font-weight: 600;
  color: #ffffff;

  transition: transform 0.4s;

  &:hover {
    transform: translate(0, 6px);
  }
`;
