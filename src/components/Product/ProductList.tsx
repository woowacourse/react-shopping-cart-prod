import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ProductItem from './ProductItem';
import EmptyMessage from '../Common/EmptyMessage';

import { productState } from '../../states/products';

const ProductList = () => {
  const products = useRecoilValue(productState);

  if (products.length === 0) {
    return <EmptyMessage type='product' />;
  }

  return (
    <ProductListContainer>
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ProductListContainer>
  );
};

const ProductListContainer = styled.ul`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 282px);
  grid-row-gap: 84px;
  grid-column-gap: 48px;
`;

export default ProductList;
