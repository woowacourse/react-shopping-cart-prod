import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import cartState from '../../../globalState/atoms/cartState';

const EmptyCartSuspense = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const cartList = useRecoilValue(cartState);

  const handleLinkButtonClick = () => {
    navigate('/');
  };

  return cartList.length ? (
    <>{children}</>
  ) : (
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

  margin-top: 15vh;

  font-weight: 500;
  font-size: 30px;

  text-align: center;
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

export default EmptyCartSuspense;
