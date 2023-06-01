import styled from '@emotion/styled';
import PageTemplate from '../../templates/PageTemplate';
import DetailList from '../../list/DetailList/DetailList';
import { useOrderFetch } from '../../../hooks/useOrderFetch';
import { Link } from 'react-router-dom';
import { Text } from '../../common/Text/Text';
import ErrorBox from '../../common/ErrorBox/ErrorBox';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

const OrderPage = () => {
  const { orderListData, isError, isFetching } = useOrderFetch();

  if (isError) {
    return (
      <PageTemplate
        title="장바구니 미션- 주문목록 페이지"
        description="우아한 테크코스 레벨 2 장바구니 미션의 주문목록 페이지입니다."
      >
        <ErrorBox errorType="emptyOrder" />
      </PageTemplate>
    );
  }

  if (isFetching) {
    return (
      <PageTemplate
        title="장바구니 미션- 주문목록 페이지"
        description="우아한 테크코스 레벨 2 장바구니 미션의 주문목록 페이지입니다."
      >
        <LoadingSpinner />
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      title="장바구니 미션- 주문목록 페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 주문목록 페이지입니다."
    >
      <OrderPageWrapper>
        <OrderPageHead>
          <Text size="extraLarge" weight="bold">
            주문 목록
          </Text>
        </OrderPageHead>
        <OrderWrapper>
          {orderListData && orderListData.length !== 0 ? (
            orderListData.map((order) => {
              return (
                <Link key={order.id} to={`/orders/${order.id}`}>
                  <DetailList order={order} />
                </Link>
              );
            })
          ) : (
            <NoOrderTitle>주문목록이 없습니다.</NoOrderTitle>
          )}
        </OrderWrapper>
      </OrderPageWrapper>
    </PageTemplate>
  );
};

const OrderPageWrapper = styled.div`
  display: flex;
  width: 1140px;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 500px;
  }

  @media screen and (max-width: 510px) {
    width: 300px;
  }
`;
const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: auto;
`;

const OrderPageHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 20px 0 20px 66.51px;
  gap: 40px;
  margin-bottom: 8px;
  border-bottom: 4px solid #333;
`;

const NoOrderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 500;
`;
export default OrderPage;
