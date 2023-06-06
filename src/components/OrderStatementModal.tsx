import styled from "styled-components";
import { OrderResultStatement } from "types/domain";
import Modal from "./common/Modal";
import PageHeader from "./common/PageHeader";
import OrderItem from "./OrderItem";

interface OrderStatementProps {
  itemForModal: OrderResultStatement;
  closeModal: () => void;
}

const OrderStatementModal = ({
  itemForModal,
  closeModal,
}: OrderStatementProps) => {
  const { orderId, orderItems, total, deliveryFee } = itemForModal;

  return (
    <Modal closeEvent={closeModal}>
      <PageHeader>주문 상세 내역</PageHeader>
      <OrderInfo>
        <span>주문번호</span>
        <span>주문 금액</span>
        <span>배송비</span>
        <span>총 결제금액</span>
        <span>{orderId}</span>
        <span>{total.toLocaleString()}원</span>
        <span>{deliveryFee.toLocaleString()}원</span>
        <span>{(total + deliveryFee).toLocaleString()}원</span>
      </OrderInfo>
      <OrderList>
        {orderItems.map((item) => {
          const { product, quantity, total, coupons } = item;
          return (
            <OrderBox key={`order-item-${item.product.id}`}>
              <OrderItem item={item} />
              <OrderDetail>
                <span>상품 금액 (1개)</span>
                <span> {product.price.toLocaleString()}원</span>
                <span>주문 수량</span>
                <span> {quantity.toLocaleString()}개</span>
                <span>결제 금액</span>
                <span> {total.toLocaleString()}원</span>
                {coupons.length !== 0 && (
                  <>
                    <span> ㄴ 주문 금액</span>
                    <span>{(product.price * quantity).toLocaleString()}원</span>
                    <span> ㄴ 할인 금액</span>
                    <span>
                      {(product.price * quantity - total).toLocaleString()}원
                    </span>
                  </>
                )}
              </OrderDetail>
              {coupons.length !== 0 && (
                <OrderDetail>
                  <span>적용 쿠폰</span>
                  <span> {coupons[0].name}</span>
                  <span>할인 금액</span>
                  <span>
                    {coupons[0].discount.amount}
                    {coupons[0].discount.type === "price" ? "원" : "%"}
                  </span>
                </OrderDetail>
              )}
            </OrderBox>
          );
        })}
      </OrderList>
    </Modal>
  );
};

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px 0;

  font-size: 16px;
  margin: 5px 0;

  text-align: center;

  & > * {
    // border: 1px solid var(--gray-color);
  }
`;

const OrderList = styled.div`
  over-flow: auto;
`;

const OrderBox = styled.div`
  border: 1px solid var(--gray-color);
  border-radius: 5px;

  margin: 13px 0;
`;

const OrderDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 0;

  font-size: 15.5px;

  border: 1px solid var(--gray-color);
  border-radius: 5px;

  margin: 5px 10px 10px 10px;
  padding: 10px 15px;

  background-color: var(--light-color);

  & :nth-child(even) {
    text-align: right;
  }
`;

export default OrderStatementModal;
