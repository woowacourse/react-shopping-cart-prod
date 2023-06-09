import { useNavigate, useParams } from "react-router-dom";
import {
  GoToOrderListButton,
} from "../../components/OrderList/OrderList.style.ts";
import OrderItem from "../../components/OrderItem/OrderItem.tsx";
import { OrderedGroup } from "../../types/types.ts";
import PaidBox from "../../components/PaidBox/index.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { serverState } from "../../app/recoil/serverAtom.ts";
import { fetchOrderedItem } from "../../app/api/api.ts";

const PaidBoxWrapper = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    justify-content: end;
  }
`;


export const OrderListWrapper = styled.div`
  margin: 58px 0px 58px 0px;
`;

export const OrderListTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;

  color: #333333;
`;

export const OrderListDivider = styled.div`
  border: 4px solid #333333;

  margin: 29px 0px 29px 0px;
`;

function Order() {
  const navigate = useNavigate();
  const params = useParams();
  const server = useRecoilValue(serverState);

  const [orderedItem, setOrderedItem] = useState<OrderedGroup>({
    createAt: "",
    orderId: -1,
    orderItems: [],
    paymentPrice: 0,
    usedCoupons: [],
    usedPoint: 0,
  });

  const loadOrderedItem = async () => {
    const orderId = params.orderId as string;
    const data = await fetchOrderedItem(server, orderId);
    setOrderedItem(data);
  };

  useEffect(() => {
    loadOrderedItem();
  }, [params]);

  return (
    <OrderListWrapper>
      <OrderListTitle>주문 내역 상세</OrderListTitle>
      <OrderListDivider />
      <OrderItem orderItem={orderedItem} />
      <PaidBoxWrapper>
        <PaidBox paymentPrice={orderedItem.paymentPrice} />
      </PaidBoxWrapper>
      <GoToOrderListButton onClick={() => navigate("/order")}>
        {`<`} 주문 목록으로 돌아가기
      </GoToOrderListButton>
    </OrderListWrapper>
  );
}

export default Order;
