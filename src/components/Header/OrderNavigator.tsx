import { styled } from 'styled-components';
import { ROUTE_PATH } from '../../constants';
import { useGoToAnotherPage } from '../../hooks/useGoToAnotherPage';

const OrderNavigator = () => {
  const goToPage = useGoToAnotherPage();

  return (
    <Item>
      <StyledButton onClick={() => goToPage(ROUTE_PATH.ORDER_PAGE)}>주문 목록</StyledButton>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const StyledButton = styled.button`
  padding: 0;
  margin-right: 8px;
  font-size: 18px;
  font-weight: 500;
  background: none;
  color: #fff;
  cursor: pointer;
`;

export default OrderNavigator;
