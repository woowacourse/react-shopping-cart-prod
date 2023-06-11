import { Product } from 'src/types';
import * as styled from './OrderItem.styled';

interface OrderItemProps {
  detailData: {
    product: Product;
    quantity: number;
  };
}

export const OrderItem = ({ detailData }: OrderItemProps) => {
  const { product, quantity } = detailData;

  return (
    <styled.OrderItem>
      <styled.ProductImage path={product.imageUrl} />
      <styled.OrderInfo>
        <styled.ProductName>{product.name}</styled.ProductName>
        <styled.TotalPriceWithQuantity>
          {(product.price * quantity).toLocaleString('ko-kr')}원 / 수량 : {quantity}개
        </styled.TotalPriceWithQuantity>
      </styled.OrderInfo>
    </styled.OrderItem>
  );
};
