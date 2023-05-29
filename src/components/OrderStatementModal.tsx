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
        <span>총 결제금액: {amountPaid.toLocaleString()}원</span>
      </OrderInfo>
      <OrderList>
        {orders.map((item, index) => {
          return (
            <OrderBox>
              <OrderItem key={`order-item-${item.product.id}`} item={item} />
              <OrderDetail>
                <span>상품 금액 (1개)</span>
                <span> {item.product.price.toLocaleString()}원</span>
                <span>주문 수량</span>
                <span> {item.quantity.toLocaleString()}개</span>
                <span>결제 금액</span>
                <span> {item.total.toLocaleString()}원</span>
              </OrderDetail>
              {item.couponIds.length === 0 && (
                <UsedCoupon>쿠폰이 사용된 결제입니다.</UsedCoupon>
              )}
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

const OrderDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 0;

  font-size: 15.5px;

  border: 1px solid rgba(170, 170, 170, 0.3);
  border-radius: 5px;

  margin: 5px 10px 10px 10px;
  padding: 10px 15px;

  & :nth-child(even) {
    text-align: right;
  }
`;

const UsedCoupon = styled.p`
  text-align: right;
  font-size: 15.5px;

  border: 1px solid rgba(170, 170, 170, 0.3);
  border-radius: 5px;

  margin: 5px 10px 10px 10px;
  padding: 5px 10px;
`;

export default OrderStatementModal;
