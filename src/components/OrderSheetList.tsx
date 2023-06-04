import { styled } from "styled-components";
import { OrderSheetProduct } from "./OrderSheetProduct";
import { LocalProductType } from "../types/domain";

export const OrderSheetList = ({orderList} : {orderList: LocalProductType[]}) => {
  return (
    <Wrapper>
      <OrderSheetProductQuantityText>
        주문 상품 ({orderList.length}개)
      </OrderSheetProductQuantityText>
      <OrderSheetProductListWrapper>
        {orderList.map((orderItem) => (
          <OrderSheetProduct key={orderItem.id} orderItem={orderItem} />
        ))}
      </OrderSheetProductListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const OrderSheetProductQuantityText = styled.p`
  font-weight: 400;
  font-size: 20px;
  color: #333333;
`;

const OrderSheetProductListWrapper = styled.div`
  width: 80%;
  max-height: 500px;

  margin-top: 20px;
  border-top: solid 2px #aaaaaa;
  overflow: scroll;

  @media screen and (max-width: 850px) {
    width: 100%;
  }
`;
