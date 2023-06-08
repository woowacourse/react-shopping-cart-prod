import styled from 'styled-components';
import Image from '../Common/Image';
import type { OrderedProductItem } from '../../types/product';

interface OrderProductItemProps {
  orderProduct: OrderedProductItem;
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const {
    quantity,
    product: { name, imageUrl, price },
  } = orderProduct;
  const totalPrice = price * quantity;

  return (
    <OrderProductItemContainer>
      <Image src={imageUrl} alt={name} loading='lazy' size='small' />
      <OrderProductInfo>
        <OrderProductName>{name}</OrderProductName>
        <OrderProductDetailInfo>
          <span>{totalPrice.toLocaleString('ko-KR')}원 / </span>
          <span>수량 : {quantity}개</span>
        </OrderProductDetailInfo>
      </OrderProductInfo>
    </OrderProductItemContainer>
  );
};

const OrderProductItemContainer = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  padding: 33px 0 0 26px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray400};
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
