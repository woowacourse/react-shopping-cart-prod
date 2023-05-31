import { styled } from 'styled-components';
import ProductImg from '../ProductCard/ProductImg/ProductImg';

type OrderItemProps = {
  quantity: number;
  name: string;
  price: number;
  imageUrl: string;
};

const OrderItem = ({ quantity, name, price, imageUrl }: OrderItemProps) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <ProductImg imageUrl={imageUrl}></ProductImg>
      </ImageWrapper>
      <DetailInfo>
        <ProductName>{name}</ProductName>
        <ProductPriceWithQuantity>
          ₩ {(price * quantity).toLocaleString()} / 수량 : {quantity}개
        </ProductPriceWithQuantity>
      </DetailInfo>
    </Wrapper>
  );
};

export default OrderItem;

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;

  padding: 24px 24px;

  width: 100%;
  height: 180px;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 180px;
  height: 180px;

  overflow: hidden;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 24px 0;

  width: auto;
  height: 100%;
`;

const ProductName = styled.span`
  font-size: 20px;
`;

const ProductPriceWithQuantity = styled.span`
  font-size: 16px;
  color: #888888;
`;
