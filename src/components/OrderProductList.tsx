import { useRecoilValue } from "recoil";
import type { LocalProductType } from "../types/domain";
import styled from "styled-components";
import { selectedProductsState } from "../recoil/atom";

export const OrderProductList = () => {
  const selectedProducts = useRecoilValue<LocalProductType[]>(
    selectedProductsState
  );

  return (
    <Wrapper>
      <TitleBox>주문 상품 ({selectedProducts.length}개)</TitleBox>
      <OrderProductsContainer>
        {selectedProducts.map((product) => (
          <OrderProduct key={product.id} {...product} />
        ))}
      </OrderProductsContainer>
    </Wrapper>
  );
};

const OrderProduct = ({
  id,
  name,
  price,
  imageUrl,
  quantity,
}: LocalProductType) => {
  return (
    <ProductWrapper key={id}>
      <img src={imageUrl} alt="상품이미지" />
      <InfoContainer>
        <Container>
          <NameBox>{name}</NameBox>
          <QuantityBox>{quantity}개</QuantityBox>
        </Container>
        <PriceBox>총 {(quantity * price).toLocaleString()}원</PriceBox>
      </InfoContainer>
    </ProductWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 750px;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 40px;

  font-size: 18px;
  text-align: start;
  border-bottom: 3px solid #aaaaaa;
`;

const ProductWrapper = styled.section`
  display: flex;
  min-width: 100%;
  padding: 15px 0;

  position: relative;
  border-bottom: 1.5px solid #cccccc;

  & > img {
    width: 130px;
    height: 130px;
    border-radius: 5px;

    @media screen and (max-width: 850px) {
      width: 100px;
      height: 100px;
    }
  }

  &:last-of-type {
    border: none;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  margin: 5px 15px;

  font-size: 18px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 850px) {
    width: 140px;
  }
`;

const QuantityBox = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const PriceBox = styled.p`
  align-self: end;

  font-size: 14px;
`;
