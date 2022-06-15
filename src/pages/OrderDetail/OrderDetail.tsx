import { getOrder } from '@/api/order';
import ErrorContainer from '@/components/common/ErrorContainer/ErrorContainer';
import Loading from '@/components/common/Loading/Loading';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import { withLogin } from '@/components/helper/withLogin';
import Receipt from '@/components/order/ Receipt/Receipt';
import OrderItem from '@/components/order/OrderItem/OrderItem';
import { useFetch } from '@/hooks/useFecth';
import { useParams } from 'react-router-dom';
import * as Styled from './OrderDetail.style';

function OrderDetail() {
  const { orderId } = useParams();

  const { isLoading, isError, data } = useFetch({ action: () => getOrder(orderId), deps: [] });

  if (isLoading) {
    return (
      <PageTemplate>
        <Styled.Container>
          <Styled.Title>주문 상세</Styled.Title>
          <Styled.Wrapper />
        </Styled.Container>
        <Loading type="page">👻</Loading>
      </PageTemplate>
    );
  }

  if (isError) {
    return (
      <PageTemplate>
        <Styled.Container>
          <Styled.Title>주문 상세</Styled.Title>
          <ErrorContainer>주문 상세 정보를 가져오지 못했습니다.</ErrorContainer>
        </Styled.Container>
      </PageTemplate>
    );
  }

  const { order } = data as any;

  const orderPayAmount = order.orderDetails.reduce(
    (prev, cart) => prev + cart.price * cart.quantity,
    0,
  );

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.Title>주문 상세</Styled.Title>
        <Styled.Wrapper>
          <OrderItem key={order.id} order={order} />
          <Receipt payAmount={orderPayAmount} />
        </Styled.Wrapper>
      </Styled.Container>
    </PageTemplate>
  );
}

export default withLogin(OrderDetail, true);
