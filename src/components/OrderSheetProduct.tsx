import { styled } from "styled-components";
import { LocalProductType } from "../types/domain";

interface OrderSheetProductPropsType {
  checkedCartItem: LocalProductType;
}

export const OrderSheetProduct = (props: OrderSheetProductPropsType) => {
  return (
    <Wrapper>
      <img src={props.checkedCartItem.imageUrl} alt="상품이미지" />
      <Container>
        <NameText>{props.checkedCartItem.name}</NameText>
        <QuantityText>수량 : {props.checkedCartItem.quantity}개</QuantityText>
        <PriceText>
          상품 개당 : {props.checkedCartItem.price.toLocaleString()}원
        </PriceText>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  min-width: 100%;
  padding: 10px;
  border-bottom: 1.5px solid #cccccc;

  & > img {
    width: 140px;
    height: 140px;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
`;

const NameText = styled.div`
  width: 300px;
  margin: 5px 10px;

  font-size: 18px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 850px) {
    width: 140px;
  }
`;

const QuantityText = styled.p`
  font-weight: 500;
  font-size: 22px;
  align-self: end;

  color: #333333;
`;

const PriceText = styled.p`
  align-self: end;

  font-size: 14px;
`;
