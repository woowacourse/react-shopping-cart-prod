import styled from 'styled-components';
import Box from 'components/@common/Box';
import OrderCardList from 'components/OrderCardList/OrderCardList';

const OrderListPage = () => {
  return (
    <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column' }}>
      <PageTitle>주문 목록</PageTitle>
      <OrderCardList />
    </Box>
  );
};

export default OrderListPage;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;
