import { getOrder } from 'apis/orders';
import Box from 'components/@common/Box';
import LoadingErrorCard from 'components/LoadingErrorCard/LoadingErrorCard';
import OrderCard from 'components/OrderCardList/OrderCard/OrderCard';
import useFetch from 'hooks/useFetch';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Order } from 'types/order';

const OrderDetailPage = () => {
  const { orderId } = useParams();

  const { data: order, isLoading, errorState, fetchData } = useFetch<Order>(() => getOrder(Number(orderId)));

  if (isLoading) return <div>주문 상세 정보 로딩중</div>;
  if (errorState?.isError) return <LoadingErrorCard onClickRetryButton={fetchData}></LoadingErrorCard>;

  return (
    <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column' }}>
      <PageTitle>주문 상세</PageTitle>
      <SectionContainer sizing={{ width: '100%' }} flex={{ align: 'flex-start', gap: '80px' }} role="region">
        <ProductSection sizing={{ width: '60%' }}>
          {order && <OrderCard key={orderId} order={order} isDetail />}
        </ProductSection>
        <PriceSection sizing={{ width: '40%' }}></PriceSection>
      </SectionContainer>
    </Box>
  );
};

export default OrderDetailPage;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid var(--color-grayscale-500);
  font-size: 32px;
  text-align: center;
`;

const SectionContainer = styled(Box)`
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 50px;
  }
`;

const ProductSection = styled(Box)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PriceSection = styled(Box)`
  position: sticky;
  top: 140px;
  margin-top: 60px;
  background-color: var(--color-pure-white);

  @media (max-width: 768px) {
    position: initial;
    width: 100%;
    margin: 0;
  }
`;
