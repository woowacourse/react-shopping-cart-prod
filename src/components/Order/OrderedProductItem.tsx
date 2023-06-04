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
        <Image src={imageUrl} alt={name} variant='small' />
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
  height: 180px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    padding: 0 24px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
`;

const ProductInfoContainer = styled.dl`
  margin: 0 0 0 16px;
  align-self: start;

  & > dt {
    font-size: 18px;
  }

  & > dd {
    margin: 12px 0 0 0;
    color: ${({ theme }) => theme.colors.gray400};
    font-size: 14px;
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    margin: 0 0 0 24px;

    & > dt {
      font-size: 20px;
    }

    & > dd {
      font-size: 16px;
    }
  }
`;

export default OrderedProductItem;
