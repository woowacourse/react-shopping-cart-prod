import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from './common/Button';

const CartEmptyPlaceholderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;

  width: 100%;
  padding: 12px;
`;

const Title = styled.h1`
  margin-top: 32px;
  text-align: center;
  font-size: 24px;
  color: #888888;
`;

const CartEmptyPlaceholder = () => {
  const navigate = useNavigate();

  return (
    <CartEmptyPlaceholderContainer>
      <Title>장바구니가 비어있습니다!</Title>

      <Button onClick={() => navigate('/')}>홈으로 가기</Button>
    </CartEmptyPlaceholderContainer>
  );
};

export default CartEmptyPlaceholder;
