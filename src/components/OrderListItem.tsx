import type { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const OrderListItemContainer = styled.div`
  border: 1px solid #aaaaaa;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 36px;
  background: #f6f6f6;
  border-bottom: 1px solid #aaaaaa;
`;

const OrderHeaderContent = styled.div``;

const OrderCartItemList = styled.div`
  & > * {
    height: 220px;
  }

  & > * + * {
    border-top: 1px solid #aaaaaa;
  }
`;

type OrderListItemProps = PropsWithChildren<{
  orderId: string;
}>;

const OrderListItem = (props: OrderListItemProps) => {
  const { orderId, children } = props;

  return (
    <OrderListItemContainer>
      <OrderHeader>
        <OrderHeaderContent>주문번호: {orderId}</OrderHeaderContent>
        <OrderHeaderContent>상세보기 ›</OrderHeaderContent>
      </OrderHeader>

      <OrderCartItemList>{children}</OrderCartItemList>
    </OrderListItemContainer>
  );
};

export default OrderListItem;
