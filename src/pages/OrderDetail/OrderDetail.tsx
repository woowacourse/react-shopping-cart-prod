import { useParams } from "react-router-dom";
import {
  OrderListDivider,
  OrderListTitle,
  OrderListWrapper,
} from "../../components/OrderList/OrderList.style.ts";
import OrderItem from "../../components/OrderItem/OrderItem.tsx";
import { OrderedGroup } from "../../types/types.ts";
import PaidBox from "../../components/PaidBox";
import styled from "styled-components";
import { useEffect, useState } from "react";

const PaidBoxWrapper = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    justify-content: end;
  }
`;

function OrderDetail() {
  const params = useParams();

  const [orderedItem, setOrderedItem] = useState<OrderedGroup>({
    createAt: '',
    orderId: -1,
    orderItems: [],
    paymentPrice: 0,
    usedCoupons: [],
    usedPoint: 0
  });

  const loadOrderedItem = async () => {
    const response = await fetch(`/orders/${params.orderId}`);
    const data: OrderedGroup = await response.json();
    setOrderedItem(data);
  };

  useEffect(() => {
    loadOrderedItem();
  }, []);

  return (
    <OrderListWrapper>
      <OrderListTitle>주문 내역 상세</OrderListTitle>
      <OrderListDivider />
      <OrderItem orderItem={orderedItem} />
      <PaidBoxWrapper>
        <PaidBox paymentPrice={orderedItem.paymentPrice} />
      </PaidBoxWrapper>
    </OrderListWrapper>
  );
}

export default OrderDetail;
