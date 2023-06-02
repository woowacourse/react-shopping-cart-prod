import styled from 'styled-components';

import Image from '../Common/Image';

import type { Product } from '../../types/product';
import ProductCartButton from './ProductCartButton';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { imageUrl, name, price } = product;

  return (
    <ProductContainer>
      <Image src={imageUrl} alt={name} loading='lazy' />
      <ProductInfoContainer>
        <dl>
          <ProductName>{name}</ProductName>
          <ProductPrice>{price.toLocaleString('ko-KR')} 원</ProductPrice>
        </dl>
        <ProductCartButton product={product} />
      </ProductInfoContainer>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  width: 282px;
`;

const ProductInfoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  padding: 0 14px;
`;

const ProductName = styled.dt`
  line-height: 22px;
`;

const ProductPrice = styled.dd`
  font-size: 20px;
  line-height: 26.67px;
`;

export default ProductItem;
