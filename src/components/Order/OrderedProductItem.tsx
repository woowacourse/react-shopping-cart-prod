import styled from 'styled-components';

import Image from '../Common/Image';

import type { CartProduct, Product } from '../../types/product';

type OrderedProductItemProps = Pick<Product, 'name' | 'price' | 'imageUrl'> &
  Pick<CartProduct, 'quantity'>;

const OrderedProductItem = ({
  name,
  price,
  imageUrl,
  quantity,
}: OrderedProductItemProps) => {
  return (
    <OrderedItem>
      <ItemContainer>
        <Image src={imageUrl} alt={name} size='small' />
        <ProductInfoContainer>
          <dt>{name}</dt>
          <dd>
            {price.toLocaleString('ko-KR')}원 / 수량: {quantity}개
          </dd>
        </ProductInfoContainer>
      </ItemContainer>
    </OrderedItem>
  );
};

const OrderedItem = styled.li`
  display: flex;
  align-items: center;
  height: 220px;
  padding: 0 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const ItemContainer = styled.div`
  display: flex;
`;

const ProductInfoContainer = styled.dl`
  margin: 0 0 0 36px;
  align-self: start;

  & > dt {
    font-size: 20px;
  }

  & > dd {
    margin: 20px 0 0 0;
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

export default OrderedProductItem;
