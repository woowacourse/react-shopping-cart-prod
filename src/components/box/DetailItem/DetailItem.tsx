import styled from '@emotion/styled';
import { OrderProductsType } from '../../../types/types';
import { Text } from '../../common/Text/Text';

const DetailItem = ({ orderProduct }: { orderProduct: OrderProductsType }) => {
  const { quantity, product } = orderProduct;

  return (
    <DetailItemWrapper>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <OrderInfoWrapper>
        <Text size="smallest" weight="bold">
          {product.name}
        </Text>
        <Text size="smallest" weight="light" color="#888">
          {product.price}원 / 수량: {quantity}개
        </Text>
      </OrderInfoWrapper>
      <div></div>
    </DetailItemWrapper>
  );
};

export default DetailItem;

const DetailItemWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 20px 26px;

  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
`;

const OrderInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;

  height: 88px;
  min-width: calc(100% - 148px);
  margin-left: 16px;
  @media screen and (max-width: 660px) {
    height: 66px;
    margin-left: 12px;
    min-width: calc(100% - 118px);
  }
`;

const ProductImage = styled.img`
  object-fit: cover;
  width: 88px;
  height: 88px;
  border-radius: 4px;
  min-width: 88px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.05);
  @media screen and (max-width: 660px) {
    width: 66px;
    height: 66px;
    min-width: 66px;
  }
`;
