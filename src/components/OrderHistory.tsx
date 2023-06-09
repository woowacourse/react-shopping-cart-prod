import { styled } from "styled-components";
import { useRouter } from "../hooks/useRouter";
import { ROUTER_PATH } from "../router";
import { OrderDetailType } from "../types/domain";

export const OrderHistory = ({
  id,
  products,
  totalProductPrice,
}: OrderDetailType) => {
  const { goPage } = useRouter();

  return (
    <Wrapper key={id}>
      <OrderTitleContainer>
        <span>주문 번호 : {id}</span>
        {!totalProductPrice && (
          <p onClick={goPage(ROUTER_PATH.OrderDetail + `/${id}`)}>
            상세보기 {">"}
          </p>
        )}
      </OrderTitleContainer>
      {products.map(({ id, imageUrl, name, price, quantity }) => (
        <OrderContainer key={id}>
          <img src={imageUrl} alt="상품이미지" />
          <InfoContainer>
            <NameBox>{name}</NameBox>
            <PriceBox>
              {(price * quantity).toLocaleString()}원 / 수량 : {quantity}개
            </PriceBox>
          </InfoContainer>
        </OrderContainer>
      ))}
      {totalProductPrice && (
        <>
          <PaymentTitleBox>
            <p>결제금액 정보</p>
          </PaymentTitleBox>
          <PaymentInfoBox>
            <p>총 결제금액</p>
            <p>{totalProductPrice.toLocaleString()}원</p>
          </PaymentInfoBox>
        </>
      )}
    </Wrapper>
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
  border: 1px solid #aaaaaa;

  & > p {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 30px;
`;

const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 20px;
  border: 1px solid #aaaaaa;
  border-top: none;

  & > img {
    width: 137px;
    height: 137px;
    object-fit: cover;
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

const PaymentTitleBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  width: 50%;
  max-width: 560px;
  height: 80px;

  padding: 0 20px;
  background: #f6f6f6;
  border: 1px solid #aaaaaa;
  border-top: none;

  font-size: 20px;
  font-weight: 600;
`;

const PaymentInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
  width: 50%;
  max-width: 560px;
  height: 100px;

  padding: 0 20px;
  border: 1px solid #aaaaaa;
  border-top: none;
  font-weight: 600;
`;
