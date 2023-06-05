import { ErrorBoundary } from 'react-error-boundary';
import * as styled from './ProductList.styled';

import { Product } from '../Product/Product';
import { FallbackRender } from '@components/FallbackRender/FallbackRender';

import { useFetchProducts } from '@recoils/productsAtoms';

export const ProductList = () => {
  const products = useFetchProducts();

  return (
    <styled.Wrapper>
      <styled.TotalProductLength>총 {products.length} 개의 상품</styled.TotalProductLength>
      <styled.ProductList>
        {products.map((product) => (
          <ErrorBoundary fallbackRender={FallbackRender}>
            <Product key={product.id} item={product} />
          </ErrorBoundary>
        ))}
      </styled.ProductList>
    </styled.Wrapper>
  );
};
