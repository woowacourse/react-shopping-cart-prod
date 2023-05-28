import styled from 'styled-components';
import Image from '../Common/Image';
import type { OrderProduct } from '../../types/product';

interface OrderProductItemProps {
  orderProduct: OrderProduct;
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const { quantity } = orderProduct;
  const { name, imageUrl, price } = orderProduct.product;

  return (
    <OrderProductItemContainer>
      <Image src={imageUrl} alt={name} loading='lazy' size='small' />
      <OrderProductInfo>
        <OrderProductName>{name}</OrderProductName>
        <OrderProductDetailInfo>
          <span>{price.toLocaleString('ko-KR')}원 / </span>
          <span>수량 : {quantity}개</span>
        </OrderProductDetailInfo>
      </OrderProductInfo>
    </OrderProductItemContainer>
  );
};

const OrderProductItemContainer = styled.div`
  width: 1300px;
  height: 220px;
  display: flex;
`;

const OrderProductInfo = styled.div`
  margin-left: 33px;
`;

const OrderProductName = styled.p`
  font-size: 20px;
`;

const OrderProductDetailInfo = styled.div`
  margin-top: 18px;
  color: ${({ theme }) => theme.colors.gray400};
`;

export default OrderProductItem;
