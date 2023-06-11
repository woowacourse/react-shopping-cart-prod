import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useCallback } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import usePromise from '../../../hooks/usePromise';
import type { Product } from '../../../types/product';
import serverNameState from '../../../globalState/atoms/serverName';
import ProductsApi from '../../../api/Products';

const ProductList = () => {
  const serverName = useRecoilValue(serverNameState);

  const productsFetcher = useCallback(() => ProductsApi.getAllList(serverName), [serverName]);
  const { getData } = usePromise<Product[]>(productsFetcher);

  const productList = getData();

  return (
    <section>
      <ProductListContainer>
        {productList?.map(({ id, name, price, imageUrl }) => (
          <li key={id}>
            <ProductItem id={id} name={name} price={price} imageUrl={imageUrl} />
          </li>
        ))}
      </ProductListContainer>
    </section>
  );
};

const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(282px, 1fr));
  grid-column-gap: 30px;
  grid-row-gap: 48px;

  place-items: center;

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(282px, 1fr));
  }
`;

export default ProductList;
