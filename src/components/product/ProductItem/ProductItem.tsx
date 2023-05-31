import { Suspense } from 'react';
import { styled } from 'styled-components';
import Image from '../../common/Image/Image';
import SmallCartIcon from '../../../assets/icons/SmallCartIcon';
import { formatPrice } from '../../../utils/formatPrice';
import type { Product } from '../../../types/product';
import ProductCounter from '../ProductCounter/ProductCounter';

const ProductItem = (product: Product) => {
  const { id, name, price, imageUrl } = product;

  return (
    <ItemContainer>
      <ProductImageWrapper>
        <Image src={imageUrl} alt={name} size="large" />
        <Suspense
          fallback={
            <Fallback>
              <SmallCartIcon />
            </Fallback>
          }
        >
          <ProductCounter id={id} name={name} price={price} imageUrl={imageUrl} />
        </Suspense>
      </ProductImageWrapper>
      <Contents>
        <div>
          <Title>{name}</Title>
          <Price>{formatPrice(price)}</Price>
        </div>
      </Contents>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  width: 282px;
  height: 358px;
`;

const ProductImageWrapper = styled.div`
  position: relative;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0 12px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.p`
  margin-top: 3px;
  font-size: 20px;
  font-weight: 400;
`;

const Fallback = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;

  padding: 7px;

  background: #ffffff;
  border: 1px solid #dddddd;
`;

export default ProductItem;
