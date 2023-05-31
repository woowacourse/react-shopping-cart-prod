import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const EmptyCartView = () => {
  const navigate = useNavigate();

  const handleLinkButtonClick = () => {
    navigate('/');
  };

  return (
    <EmptyCartViewContainer>
      장바구니에 상품이 존재하지 않습니다.
      <LinkButton onClick={handleLinkButtonClick}>상품 담으러 가기</LinkButton>
    </EmptyCartViewContainer>
  );
};

const EmptyCartViewContainer = styled.div`
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

export default EmptyCartView;
