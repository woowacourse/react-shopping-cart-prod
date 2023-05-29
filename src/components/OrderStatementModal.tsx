import styled from "styled-components";
import { OrderResult } from "types/domain";
import Modal from "./common/Modal";
import PageHeader from "./common/PageHeader";
import OrderItem from "./OrderItem";

interface OrderStatementProps {
  orderId: number;
  orders: OrderResult[];
  closeModal: () => void;
}

const OrderStatementModal = ({
  orderId,
  orders,
  closeModal,
}: OrderStatementProps) => {
  const amountPaid = orders.reduce((result, order) => result + order.total, 0);

  return (
    <Modal closeEvent={closeModal}>
      <PageHeader>주문 상세 내역</PageHeader>
      <OrderInfo>
        <span>주문번호: {orderId}</span>
        <span>결제금액: {amountPaid.toLocaleString()}원</span>
      </OrderInfo>
      <OrderList>
        {orders.map((item, index) => {
          return (
            <OrderBox>
              <OrderItem key={`order-item-${item.product.id}`} item={item} />
            </OrderBox>
          );
        })}
      </OrderList>
    </Modal>
  );
};

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 18px;
  margin: 5px 0;
`;

const OrderList = styled.div`
  over-flow: auto;
`;

const OrderBox = styled.div`
  border: 1px solid rgba(170, 170, 170, 0.5);
  border-radius: 5px;

  margin: 13px 0;
`;

export default OrderStatementModal;
