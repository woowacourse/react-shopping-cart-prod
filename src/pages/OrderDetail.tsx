import { styled } from 'styled-components';
import ContentLayout from 'components/@common/ContentLayout';
import { useParams } from 'react-router-dom';
import { getOrderDetail } from 'api/requests';
import { OrderDetailType } from 'types';
import { useGet } from 'hooks/useGet';
import OrderItemList from 'components/Order/OrderItemList';
import Payment from 'components/Order/Payment';

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data } = useGet<OrderDetailType>(getOrderDetail(Number(orderId)));

  return (
    <ContentLayout>
      <Title>🚚 주문상세 🚚</Title>
      <Wrapper>
        {data && <OrderItemList order={data} />}
        {data && <Payment order={data} />}
      </Wrapper>
    </ContentLayout>
  );
};

export default OrderDetail;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  height: 60px;
  margin-bottom: 32px;
  text-align: center;
  font: ${(props) => props.theme.font.large};
  border-bottom: 4px solid ${(props) => props.theme.color.primary};
`;
