import styled from "styled-components";
import { useRecoilValue } from "recoil";
import type { LocalProductType } from "../types/domain";
import { selectedProductsState } from "../recoil/atom";

export const OrderHistoryList = () => {
  const selectedProducts = useRecoilValue<LocalProductType[]>(
    selectedProductsState
  );

  return (
    <Wrapper>
      <OrderProductsContainer>
        {selectedProducts.map((product) => (
          <OrderHistory key={product.id} {...product} />
        ))}
      </OrderProductsContainer>
    </Wrapper>
  );
};

const OrderHistory = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
}: LocalProductType) => {
  return (
    <HistoryWrapper>
      <OrderTitleContainer>
        <p>주문 번호</p>
        <p>상세보기 {">"}</p>
      </OrderTitleContainer>
      <OrderContainer>
        <img src={imageUrl} alt="상품이미지" />
        <InfoContainer>
          <NameBox>{name}</NameBox>
          <PriceBox>
            {(price * quantity).toLocaleString()}원 / 수량 : {quantity}개
          </PriceBox>
        </InfoContainer>
      </OrderContainer>
    </HistoryWrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 85%;
  max-width: 1000px;

  color: #333333;
`;

const OrderTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 65px;

  padding: 0 20px;
  font-size: 17px;
  background: #f6f6f6;
  border-bottom: 1px solid #aaaaaa;
`;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #aaaaaa;

  margin-top: 30px;
`;

const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 20px;
  border-bottom: 1px solid #aaaaaa;

  & > img {
    width: 137px;
    height: 137px;
  }

  &:last-of-type {
    border: none;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px 15px;
`;

const OrderProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  max-height: 500px;
  overflow: scroll;
`;

const NameBox = styled.div`
  width: 300px;
  margin-bottom: 30px;

  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 850px) {
    width: 140px;
  }
`;

const PriceBox = styled.p`
  height: 60%;

  font-size: 14px;
  letter-spacing: 0.5px;
  color: #888888;
`;
