import { styled } from 'styled-components';
import { OrderType } from 'types/OrderType';
import { VscChevronRight } from 'react-icons/vsc';
import { OrderItemList } from '../OrderItemList';
import { useNavigate } from 'react-router-dom';

function OrderItem({ order, hasDetail }: { order: OrderType; hasDetail?: boolean }) {
  const navigate = useNavigate();
  return (
    <OrderContainer>
      <WrapperTitle>
        <OrderNumber>주문번호: {order.id}</OrderNumber>

        {hasDetail ? (
          <DetailItemButton>
            <VscChevronRight />
            <DetailItemSpan
              onClick={() => {
                navigate(`/order/${order.id}`);
              }}
            >
              상세보기
            </DetailItemSpan>
          </DetailItemButton>
        ) : null}
      </WrapperTitle>
      <OrderItemList orderItems={order.orderItems} />
    </OrderContainer>
  );
}

export default OrderItem;

const OrderContainer = styled.div`
  margin-bottom: 5rem;
`;

const OrderNumber = styled.span`
  font-size: 1.6rem;

  color: ${({ theme }) => theme.darkColor};
  font-weight: 500;
  line-height: 1.3;
`;

const DetailItemButton = styled.button`
  font-size: 1.4rem;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.secondaryColor};
`;

const DetailItemSpan = styled.span`
  line-height: 1.7;
`;

const WrapperTitle = styled.div`
  display: flex;

  justify-content: space-between;
  font-size: 1.6rem;

  color: ${({ theme }) => theme.darkColor};
  font-weight: 500;
  line-height: 1.3;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  margin-bottom: 1rem;

  border-bottom: ${({ theme }) => theme.primaryColor} 1.5px solid;
`;
