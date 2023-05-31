import { styled } from "styled-components";
import { useRouter } from "../hooks/useRouter";
import { ROUTER_PATH } from "../router";
import { LocalProductType } from "../types/domain";

export const OrderHistory = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
}: LocalProductType) => {
  const { goPage } = useRouter();
  return (
    <HistoryWrapper key={id}>
      <OrderTitleContainer>
        <span>주문 번호</span>
        <p onClick={goPage(ROUTER_PATH.OrderDetail)}>상세보기 {">"}</p>
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

  & > p {
    cursor: pointer;
  }
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
    object-fit: cover;
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
