import * as styled from './ProductList.styled';

import { Product } from '../Product/Product';

import { useFetchProducts } from '@recoils/productsAtoms';

export const ProductList = () => {
  const products = useFetchProducts();

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
