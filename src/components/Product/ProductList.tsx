import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import * as List from './ProductItem';
import Message from '../Common/Message';

import { productState } from '../../states/products';
import { serverNameState } from '../../states/serverName';

const ProductList = () => {
  const serverName = useRecoilValue(serverNameState);
  const products = useRecoilValue(productState(serverName));

  if (!products.length) {
    return <Message type="empty" />;
  }

  return (
    <ProductListContainer>
      {products.map(product => (
        <List.ProductItem key={product.id} product={product} />
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
