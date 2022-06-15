import { getOrders } from '@/api/order';
import ErrorContainer from '@/components/common/ErrorContainer/ErrorContainer';
import Loading from '@/components/common/Loading/Loading';
import { withLogin } from '@/components/helper/withLogin';
import OrderItem from '@/components/order/OrderItem/OrderItem';
import { useFetch } from '@/hooks/useFecth';
import { useNavigate } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import * as Styled from './OrderList.style';

function OrderList() {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useFetch({ action: getOrders, deps: [] });

  const onClickHeader = id => {
    navigate(`./${id}`);
  };

  if (isLoading) {
    return (
      <PageTemplate>
        <Styled.Container>
          <Styled.Title>주문 목록</Styled.Title>
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
          <Styled.Title>주문 목록</Styled.Title>
          <ErrorContainer>주문 목록을 가져오지 못했습니다.</ErrorContainer>
        </Styled.Container>
      </PageTemplate>
    );
  }

  const { orders: orderList } = data as any;

  if (orderList.length === 0) {
    return (
      <PageTemplate>
        <Styled.Container>
          <Styled.Title>주문 목록</Styled.Title>
          <ErrorContainer>주문 내역이 존재하지 않습니다.</ErrorContainer>
        </Styled.Container>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.Title>주문 목록</Styled.Title>
        <Styled.Wrapper>
          {orderList.map(order => (
            <OrderItem key={order.id} order={order} onClickHeader={() => onClickHeader(order.id)} />
          ))}
        </Styled.Wrapper>
      </Styled.Container>
    </PageTemplate>
  );
}

export default withLogin(OrderList, true);
