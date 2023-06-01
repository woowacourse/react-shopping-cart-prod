import * as styled from './ProductList.styled';

import { Product } from '../Product/Product';

import { useFetchAsync } from '@hooks/useFetchAsync';

import type { Product as ProductType } from '../../types';

export const ProductList = () => {
  const products: ProductType[] = useFetchAsync('/products');

  return (
    <styled.Wrapper>
      <styled.TotalProductLength>총 {products.length} 개의 상품</styled.TotalProductLength>
      <styled.ProductList>
        {products.map((product) => (
          <Product key={product.id} item={product} />
        ))}
      </styled.ProductList>
    </styled.Wrapper>
  );
};
