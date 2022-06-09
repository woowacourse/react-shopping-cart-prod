// @ts-nocheck
import { useEffect } from 'react';

import { ProductItem } from 'components';
import Styled from './index.style';

import useGetProductsAPI from 'page/ProductListPage/useGetProductsAPI';
import useGetCartAPI from 'hooks/useGetCartAPI';

const ProductListPage = () => {
  const { getProducts, products, isProductsLoading } = useGetProductsAPI();
  const { getCart, isCartLoading } = useGetCartAPI();

  useEffect(() => {
    getProducts();
    getCart();
  }, [getCart, getProducts]);

  return (
    <Styled.ProductListPage>
      {!isProductsLoading && !isCartLoading ? (
        <Styled.ProductList>
          {products.map(({ id, name, price, image }) => {
            return (
              id && <ProductItem key={id} productId={id} name={name} price={price} image={image} />
            );
          })}
        </Styled.ProductList>
      ) : (
        <Styled.Loading>열심히 로딩중 .. ✨</Styled.Loading>
      )}
    </Styled.ProductListPage>
  );
};

export default ProductListPage;
