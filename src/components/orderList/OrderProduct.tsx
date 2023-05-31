import { Order } from "api/orders";
import { styled } from "styled-components";

const OrderProduct = (product: Order) => {
  return (
    <Wrapper>
      <ImgBox src={product.product.imageUrl} alt={`${product.product.name} 상품 이미지`} />
      <NameBox>{product.product.name}</NameBox>
      <PriceContainer>{product.total.toLocaleString()} 원</PriceContainer>
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-flow: wrap column;
  row-gap: 12px;

  height: 160px;

  border-top: 1.5px solid rgba(204, 204, 204, 1);
  padding: 10px;
`;

const ImgBox = styled.img`
  height: 100%;
  width: 180px;
  border-radius: 5px;

  margin-right: 2%;
`;

const NameBox = styled.div`
  width: 80%;
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
  width: 80%;

  color: rgba(136, 136, 136, 1);
  font-size: 16px;
  font-weight: 400;
`;

export default OrderProduct;
