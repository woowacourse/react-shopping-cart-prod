import { getOrder } from 'apis/orders';
import FlexBox from 'components/@common/FlexBox';
import Spinner from 'components/@common/Loader';
import LoadingErrorCard from 'components/LoadingErrorCard/LoadingErrorCard';
import OrderItem from 'components/OrderItem/OrderItem';
import useFetch from 'hooks/useFetch';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Order } from 'types/order';

const OrderDetailPage = () => {
  const orderId = Number(useLocation().pathname.split('/')[2]);

  const { data, isLoading, errorState, fetchData } = useFetch<Order>(() => getOrder(orderId));

  if (isLoading) return <Spinner />;
  if (errorState?.isError) return <LoadingErrorCard onClickRetryButton={fetchData} />;
  if (!data) return null;

  const order = data;

  return (
    <OrderDetailPageContainer flexDirection="column">
      <PageTitle>주문 상세</PageTitle>
      <SectionContainer gap="80px" align="flex-start" role="region">
        {order && <OrderItem order={order} type="detail" />}
        <PriceSection flexDirection="column" gap="10px">
          <Container justify="space-between">
            <SubTitle>총 금액</SubTitle>
            {order && <ProductTotalPrice>{order.totalPrice.toLocaleString('ko-KR')}원</ProductTotalPrice>}
          </Container>
          <Container justify="space-between">
            <SubTitle>사용 포인트</SubTitle>
            {order && <ProductTotalPrice>{order.usedPoint.toLocaleString('ko-KR')}p</ProductTotalPrice>}
          </Container>
        </PriceSection>
      </SectionContainer>
    </OrderDetailPageContainer>
  );
};

export default OrderDetailPage;

const OrderDetailPageContainer = styled(FlexBox)`
  width: 100%;
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid #333333;
  font-size: 32px;
  text-align: center;
`;

const SectionContainer = styled(FlexBox)`
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const PriceSection = styled(FlexBox)`
  position: sticky;
  top: 140px;
  width: 40%;
  margin-top: 60px;
  padding: 20px 26px;
  border: 1px solid #dddddd;
  background-color: #f2f2f2;

  @media (max-width: 1280px) {
    span {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 250px;
    margin: 0;
  }

  @media (max-width: 430px) {
    height: 100%;

    div {
      display: none;
    }
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #dddddd;
`;

const ProductTotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const SubTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
