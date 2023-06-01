import { styled } from 'styled-components';
import Spacer from '../../common/Spacer/Spacer';
import OrderList from '../../order/OrderList/OrderList';
import { useRecoilValue } from 'recoil';
import { ordersQuery } from '../../../recoil/selectors/order';

const OrderPage = () => {
  const orders = useRecoilValue(ordersQuery);

  return (
    <Container>
      <TitleWrapper>
        <Title>주문 목록</Title>
      </TitleWrapper>
      <Spacer height={28} />
      <OrderListContainer>
        {orders.map((order) => (
          <OrderList key={order.id} order={order} needsDetailButton isSummary />
        ))}
      </OrderListContainer>
    </Container>
  );
};

export default OrderPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const TitleWrapper = styled.div`
  height: 40px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 26px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.color.black};
`;

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;
