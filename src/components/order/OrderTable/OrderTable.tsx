import { styled } from 'styled-components';
import type { Order } from '../../../types/order';
import { BiChevronsRight } from 'react-icons/bi';
import OrderCartItem from '../OrderCartItem/OrderCartItem';

interface OrderTableProps {
  orderInfo: Order;
}

const OrderTable = ({ orderInfo }: OrderTableProps) => {
  const { id, orders } = orderInfo;

  return (
    <Container>
      <TableHeader>
        <span>주문번호: {id}</span>
        <DetailButton>
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
  border: 1px solid #aaa;

  & > li {
    border-bottom: 1px solid #aaa;
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 92px;
  padding: 0 30px;
  background-color: #f6f6f6;
  border-bottom: 1px solid #aaa;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333;
`;

const DetailButton = styled.button`
  display: flex;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333;

  svg {
    font-size: 24px;
  }
`;

export default OrderTable;
