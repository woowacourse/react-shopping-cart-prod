import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import CartList from '../CartList/CartList';
import PaymentAmount from '../PaymentAmount/PaymentAmount';
import getCartLength from '../../../globalState/selectors/getCartLength';

const CartContents = () => {
  const navigate = useNavigate();
  const cartLength = useRecoilValue(getCartLength);

  const handleLinkButtonClick = () => {
    navigate('/');
  };

  return cartLength ? (
    <Contents>
      <CartList />
      <PaymentAmount />
    </Contents>
  ) : (
    <EmptyCartView>
      장바구니에 상품이 존재하지 않습니다.
      <LinkButton onClick={handleLinkButtonClick}>상품 담으러 가기</LinkButton>
    </EmptyCartView>
  );
};

const Contents = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 34px;

  @media screen and (max-width: 1320px) {
    flex-direction: column;
    justify-content: baseline;
    gap: 100px;
  }
`;

const EmptyCartView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  margin-top: 200px;

  font-weight: 500;
  font-size: 30px;
`;

const LinkButton = styled.button`
  width: 300px;
  padding: 20px 50px;
  background-color: #333;

  border: none;
  border-radius: 15px;

  font-size: 20px;
  color: white;

  cursor: pointer;
`;

export default CartContents;
