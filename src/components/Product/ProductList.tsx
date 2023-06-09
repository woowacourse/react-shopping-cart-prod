import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { getProductsSelector } from '../../recoil/productData';

import Product from './Product';
import ActionMessage from '../Common/ActionMessage';

const ProductList = () => {
  const products = useRecoilValue(getProductsSelector);

  if (products.length === 0) return <ActionMessage type='empty' />;

  return (
    <ProductListContainer>
      {products.map((product) => (
        <li key={product.productId}>
          <Product product={product} />
        </li>
      ))}
    </ProductListContainer>
  );
};

const ProductListContainer = styled.ul`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 282px);
  grid-row-gap: 84px;
  grid-column-gap: 48px;

  @media (min-width: 640px) and (max-width: 768px) {
    grid-template-columns: repeat(2, 282px);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 282px);
  }
`;

export default ProductList;
