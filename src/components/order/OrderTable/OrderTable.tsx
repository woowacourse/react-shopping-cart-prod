import { styled } from 'styled-components';
import type { Order } from '../../../types/order';
import { BiChevronsRight } from 'react-icons/bi';
import OrderCartItem from '../OrderCartItem/OrderCartItem';
import colors from '../../../colors';
import { Link } from 'react-router-dom';

interface OrderTableProps {
  orderInfo: Order;
}

const OrderTable = ({ orderInfo }: OrderTableProps) => {
  const { id, orders } = orderInfo;

  return (
    <Container>
      <TableHeader>
        <OrderNo>주문번호: {id}</OrderNo>
        <DetailButton to={`./${id}`}>
          <span>상세보기</span>
          <BiChevronsRight />
        </DetailButton>
      </TableHeader>
      {orders.map((cartItem) => {
        return <OrderCartItem key={cartItem.id} item={cartItem} />;
      })}
    </Container>
  );
};

const Container = styled.ul`
  border: 1px solid ${colors.transparentGold};

  & > li {
    border-bottom: 1px solid ${colors.transparentGold};
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 92px;
  padding: 0 30px;
  background-color: ${colors.pureBlack};
  border-bottom: 1px solid ${colors.transparentGold};
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const OrderNo = styled.span`
  color: ${colors.gold};
`;

const DetailButton = styled(Link)`
  display: flex;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${colors.gold};

  svg {
    font-size: 24px;
  }
`;

export default OrderTable;
