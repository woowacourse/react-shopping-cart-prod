import { Suspense } from 'react';

import styled from 'styled-components';

import OrderList from '../components/Order/OrderList';
import ContentListSkeleton from '../components/Common/ContentListSkeleton';

const OrderProductsListPage = () => {
  return (
    <Main>
      <Title>주문 목록</Title>
      <OrderProductContent>
        <OrderProductInfo>
          <Suspense fallback={<ContentListSkeleton content='cart' />}>
            <OrderList />
          </Suspense>
        </OrderProductInfo>
      </OrderProductContent>
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 28px;

  max-width: 1300px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  padding: 0 0 100px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    margin: 0 20px;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 130px;
  padding: 58px 0 29px 0;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`;

const OrderProductContent = styled.div`
  width: 100%;
`;

const OrderProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export default OrderProductsListPage;
