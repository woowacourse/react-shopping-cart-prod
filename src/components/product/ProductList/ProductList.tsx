import { styled } from 'styled-components';
import ProductItem from '../ProductItem/ProductItem';
import useFetch from '../../../hooks/api/useFetch';
import { Product } from '../../../types/product';
import { useRecoilValue } from 'recoil';
import serverNameState from '../../../globalState/atoms/serverName';
import ServerUtil from '../../../utils/ServerUrl';
import { useEffect } from 'react';
import useCartService from '../../../hooks/useCartService';

const ProductList = () => {
  const { fetchCartItem } = useCartService();
  const serverName = useRecoilValue(serverNameState);
  const productsUrl = ServerUtil.getProductsUrl(serverName);

  const { getData, error } = useFetch<Product[]>(productsUrl);

  if (error) {
    throw error;
  }

  const productList = getData();

  useEffect(() => {
    fetchCartItem();
  }, [serverName]);

  return (
    <section>
      <ProductListContainer>
        {productList?.map((product) => (
          <li key={product.id}>
            <ProductItem {...product} />
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
