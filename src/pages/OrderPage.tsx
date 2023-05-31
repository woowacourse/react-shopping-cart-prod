import { styled } from 'styled-components';

import PageTitle from '../components/Common/PageTitle';
import OrderBoxList from '../components/Order/OrderBoxList';

const OrderPage = () => {
  return (
    <Main>
      <PageTitle>주문 목록</PageTitle>
      <OrderBoxList />
    </Main>
  );
};

const Main = styled.main`
  max-width: 1300px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  padding: 0 30px;
`;

export default OrderPage;
