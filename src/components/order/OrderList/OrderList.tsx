import { styled } from 'styled-components';
import OrderListItem from '../OrderListItem/OrderListItem';
import type { Order } from '../../../types/order';
import { Link } from 'react-router-dom';
import { getDateFromISOString } from '../../../utils/getDateFromISOString';

interface OrderListProps {
  order: Order;
  needsDetailButton?: boolean;
  isSummary?: boolean;
}

const OrderList = ({
  order,
  needsDetailButton = false,
  isSummary = false,
}: OrderListProps) => {
  const { id, orderDate, orders } = order;

  return (
    <Container>
      <ListHeader>
        <span>주문번호 : {id}</span>
        {needsDetailButton ? (
          <DetailButton to={`/orders/${id}`}>상세보기 &gt;</DetailButton>
        ) : (
          <time>주문일자 : {getDateFromISOString(orderDate)}</time>
        )}
      </ListHeader>
      <ListWrapper>
        {isSummary
          ? orders
              .slice(0, 3)
              .map((orderItem) => (
                <OrderListItem key={orderItem.id} orderItem={orderItem} />
              ))
          : orders.map((orderItem) => (
              <OrderListItem key={orderItem.id} orderItem={orderItem} />
            ))}
      </ListWrapper>
    </Container>
  );
};

const Container = styled.ul`
  border-radius: 8px;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 30px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.primaryLight};
  border-top-left-radius: 8px;
  border-top-right-radius: 4px;

  & > * {
    font-family: 'Noto Sans KR';
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.5px;
  }
`;

const ListWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  & > li:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  }
`;

const DetailButton = styled(Link)`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.color.white};
`;

export default OrderList;
