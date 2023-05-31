import { Order } from "api/orders";
import { styled } from "styled-components";

const OrderItem = (item: Order) => {
  return (
    <Wrapper>
      <ImgBox src={item.product.imageUrl} alt={`${item.product.name} 상품 이미지`} />
      <NameBox>{item.product.name}</NameBox>
      <PriceContainer>{item.total.toLocaleString()} 원</PriceContainer>
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-flow: wrap column;
  gap: 10px;

  height: 160px;

  border-top: 1.5px solid rgba(204, 204, 204, 1);
  padding: 10px;
`;

const ImgBox = styled.img`
  height: 100%;
  width: 180px;
  border-radius: 5px;
`;

const NameBox = styled.div`
  width: 70%;
  height: 20%;

  padding-top: 1%;

  font-size: 16px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    font-size: 13px;
  }
`;

const PriceContainer = styled.div`
  color: rgba(136, 136, 136, 1);
  font-size: 16px;
  font-weight: 400;
`;

export default OrderItem;
