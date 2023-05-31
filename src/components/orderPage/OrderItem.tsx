import styled from 'styled-components';
import { Product } from '../../types/Product';

export const OrderItem = ({ product }: { product: Product }) => {
  return (
    <Style.Container>
      <Style.ProductImage src={product.imageUrl} />
      <Style.ProductInfo>
        <p>{product.name}</p>
        <p>
          가격: {product.price}원 / 수량: {product.quantity}개
        </p>
      </Style.ProductInfo>
    </Style.Container>
  );
};

const Style = {
  Container: styled.li`
    width: 100%;

    display: flex;
    padding: 0 10px 30px 10px;

    border-bottom: 1px solid #333333;
  `,
  Content: styled.div`
    width: 100%;
    display: flex;
    padding: 0 10px;

    @media (max-width: 480px) {
      gap: 10px;
    }
  `,
  ProductImage: styled.img`
    width: 144px;
    height: 147px;
    border-radius: 8px;

    @media (max-width: 480px) {
      width: 68px;
      height: 69px;
    }
  `,
  ProductInfo: styled.div`
    display: block;
    padding: 20px 30px;

    & > :nth-child(1) {
      font-size: 20px;
      margin-bottom: 20px;
    }
  `,
};
