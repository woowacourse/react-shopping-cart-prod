import {useNavigate} from "react-router-dom";
import {
  GoToOrderListButton,
} from "../../components/OrderList/OrderList.style.ts";
import styled from "styled-components";
import BigAlert from "../../components/BigAlert";
import {ErrorBoundary} from "react-error-boundary";
import OrderDetail from "../../components/OrderDetail";

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

  return (
    <ErrorBoundary fallback={<BigAlert title="앗" message="주문 목록을 불러오는 도중 문제가 발생했습니다."/>}>
      <OrderListWrapper>
        <OrderListTitle>주문 내역 상세</OrderListTitle>
        <OrderListDivider/>
        <OrderDetail/>
        <GoToOrderListButton onClick={() => navigate("/order")}>
          {`<`} 주문 목록으로 돌아가기
        </GoToOrderListButton>
      </OrderListWrapper>
    </ErrorBoundary>
  );
}

export default Order;
