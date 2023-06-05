import styled from '@emotion/styled';
import { OrderType } from '../../../types/types';
import { Text } from '../../common/Text/Text';
import { Link } from 'react-router-dom';
import { skeletonAnimation } from '../ProductItem/ProductItem';
import Button from '../../common/Button/Button';

const OrderItem = ({ order }: { order: OrderType }) => {
  return (
    <OrderItemWrapper>
      <OrderItemHead>
        <Text size="smaller" weight="light">
          주문번호 {order.id}
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {!order.confirmState && (
            <ButtonWrapper>
              <Button text="주문확정" size="small" primary borderRadius={2} />
              <Button text="주문취소" size="small" borderRadius={2} />
            </ButtonWrapper>
          )}
          <Link to={`/order/${order.id}`}>
            <Text size="smaller" weight="light" color="rgb(177, 179, 181)">
              상세보기 &gt;
            </Text>
          </Link>
        </div>
      </OrderItemHead>
      <OrderProductList>
        {order.orderProducts.map((orderProduct) => (
          <OrderProduct key={orderProduct.product.id}>
            <ProductImage src={orderProduct.product.imageUrl} />
            <ProductInfo>
              <Text size="small" weight="normal">
                {orderProduct.product.name}
              </Text>
              <Text size="smaller" weight="light" color="rgba(0,0,0,0.4)">
                {`${orderProduct.product.price.toLocaleString()}원 / ${orderProduct.quantity}개`}
              </Text>
            </ProductInfo>
          </OrderProduct>
        ))}
      </OrderProductList>
    </OrderItemWrapper>
  );
};

export default OrderItem;

const OrderItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OrderItemHead = styled.div`
  border-radius: 6px 6px 0 0;
  width: 100%;
  height: 62px;
  background-color: rgb(243, 245, 247);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderProductList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const OrderProduct = styled.div`
  padding: 40px 26px;
  display: flex;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 141px;
  height: 141px;
  object-fit: cover;
  margin-right: 44px;
  border-radius: 3px;
  transition: all 0.32s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  background: linear-gradient(120deg, #e5e5e5 20%, #f0f0f0 28%, #f0f0f0 40%, #e5e5e5 48%);
  background-position: 100% 0;
  background-size: 282px;
  animation: ${skeletonAnimation} 1s infinite;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
