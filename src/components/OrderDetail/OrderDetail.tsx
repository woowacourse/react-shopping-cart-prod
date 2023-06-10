import OrderItem from "../OrderItem/OrderItem.tsx";
import PaidBox from "../PaidBox";
import React from "react";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {serverState} from "../../app/recoil/serverAtom.ts";
import useFetch from "../../hooks/useFetch.ts";
import BigAlert from "../BigAlert";
import {OrderedGroup} from "../../types/types.ts";
import {url} from "../../app/api/url.ts";
import {useParams} from "react-router-dom";

const PaidBoxWrapper = styled.div`
  @media screen and (min-width: ${({theme}) => theme.breakpoints.lg}) {
    display: flex;
    justify-content: end;
  }
`;

function OrderDetail() {
  const params = useParams();
  const server = useRecoilValue(serverState);
  const orderId = params.orderId as string;
  const {data: orderedItem, isLoading, error} = useFetch<OrderedGroup>('GET', `${url[server]}/orders/${orderId}`);

  if (isLoading) {
    return <BigAlert title="⌛" message="로딩중..."/>;
  }

  if (error) {
    throw new Error(error?.message);
  }

  if (orderedItem === null) {
    return null;
  }

  return (
    <>
      <OrderItem orderItem={orderedItem}/>
      <PaidBoxWrapper>
        <PaidBox paymentPrice={orderedItem.paymentPrice}/>
      </PaidBoxWrapper>
    </>
  );
}

export default OrderDetail;


